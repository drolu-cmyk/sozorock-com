#!/usr/bin/env python3
"""Read-only Open School checks. No forms or credential requests are submitted."""
import argparse
import json
import os
from pathlib import Path
import re
import shutil
import sys
from urllib.parse import parse_qs, urlparse
from playwright.sync_api import expect, sync_playwright

CANONICAL = "https://www.sozorock.com"
VIEWPORTS = ((1440, 1000), (390, 844), (375, 667))
PROGRAMS = (
    ("ai", "Applied AI Systems", "applied-ai-systems"),
    ("grc", "Cybersecurity Governance, Risk and Compliance", "cybersecurity-grc"),
    ("iam", "Identity & Access Management", "identity-access-management"),
    ("governance", "AI Governance", "ai-governance"),
)


def validated_base(value):
    p = urlparse(value)
    production = p.scheme == "https" and p.netloc == "www.sozorock.com"
    local = (p.scheme == "http" and p.hostname == "127.0.0.1" and p.port
             and 1 <= p.port <= 65535 and p.netloc == f"127.0.0.1:{p.port}")
    assert (production or local) and p.path in ("", "/") and not (
        p.query or p.fragment or p.username or p.password
    ), "Only canonical US production or explicit http://127.0.0.1:<port> is supported"
    return value.rstrip("/")


def no_overflow(page):
    bounds = page.evaluate("""() => ({viewport:document.documentElement.clientWidth,
      document:document.documentElement.scrollWidth,body:document.body.scrollWidth})""")
    assert max(bounds["document"], bounds["body"]) <= bounds["viewport"] + 1, bounds


def metadata(page, path):
    expect(page.locator('link[rel="canonical"]')).to_have_attribute("href", CANONICAL + path)
    assert "SozoRock" in page.title(), "Missing school title"
    for selector in ('meta[name="description"]', 'meta[property="og:title"]',
                     'meta[property="og:image"]', 'meta[name="twitter:card"]'):
        assert page.locator(selector).get_attribute("content"), f"Missing {selector}"
    scripts = page.locator('script[type="application/ld+json"]').all_text_contents()
    assert scripts, "Missing structured data"
    for script in scripts:
        assert isinstance(json.loads(script), dict), "Invalid structured data"


def open_home(page, base):
    response = page.goto(base + "/", wait_until="domcontentloaded")
    assert response and response.ok, "Homepage failed"
    expect(page.locator(".school-hero h1")).to_have_text(
        re.compile(r"Build the technology\.\s*Earn the trust\."))
    expect(page.locator("vite-error-overlay")).to_have_count(0)
    page.wait_for_function("""() => {
      const image=document.querySelector('.school-hero-art img');
      return image?.complete && image.naturalWidth>500 && document.fonts.status==='loaded';
    }""")
    metadata(page, "/")
    assert "meridian" not in page.locator("body").inner_text().lower(), "Retired branding"
    for fact in ("USD $299", "$49 enrollment", "$250 tuition", "12 weeks", "100% virtual"):
        expect(page.locator(".school-hero")).to_contain_text(fact)


def hero_bounds(page):
    bounds = page.evaluate("""() => {
      const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,
        right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
      const hero=document.querySelector('.school-hero');
      return {viewport:document.documentElement.clientWidth,hero:box(hero),
        image:box(hero.querySelector('.school-hero-art img')),
        copy:[...hero.querySelectorAll('h1,p,a,button')].filter(e=>e.getClientRects().length
          && getComputedStyle(e).visibility!=='hidden').map(e=>({text:e.textContent,...box(e)}))};
    }""")
    hero = bounds["hero"]
    assert abs(hero["x"]) <= 1 and abs(hero["width"]-bounds["viewport"]) <= 1, bounds
    assert bounds["image"]["height"] > 200, "Hero art collapsed"
    for item in bounds["copy"]:
        assert item["width"] > 0 and item["height"] > 0, item
        assert item["x"] >= -1 and item["right"] <= bounds["viewport"]+1, item
        assert item["y"] >= hero["y"]-1 and item["bottom"] <= hero["bottom"]+1, item
    no_overflow(page)
    return bounds


def capture_scroll(page, directory, label):
    # Overlapping actual viewport captures expose sticky/clipped content hidden
    # by stitched full-page screenshots. No arbitrary sleeps or scroll gating.
    page.screenshot(path=str(directory / f"{label}-homepage.png"), full_page=True)
    height = page.viewport_size["height"]
    total = page.evaluate("document.documentElement.scrollHeight")
    offsets = list(range(0, max(1, total-height), max(1, int(height*.8))))
    offsets.append(max(0, total-height))
    for index, offset in enumerate(dict.fromkeys(offsets)):
        page.evaluate("y=>window.scrollTo({top:y,behavior:'instant'})", offset)
        no_overflow(page)
        page.screenshot(path=str(directory / f"{label}-scroll-{index:02d}.png"))
    page.evaluate("window.scrollTo({top:0,behavior:'instant'})")


def keyboard_menu(page, mobile):
    page.keyboard.press("Tab")
    skip = page.locator('a[href^="#"]').filter(has_text=re.compile("Skip", re.I)).first
    expect(skip).to_be_focused()
    if not mobile:
        return
    toggle = page.locator("[data-menu-toggle]")
    expect(toggle).to_be_visible()
    expect(toggle).to_have_attribute("aria-expanded", "false")
    nav = page.locator("#primary-nav")
    expect(nav).to_be_hidden()
    toggle.focus()
    page.keyboard.press("Enter")
    expect(toggle).to_have_attribute("aria-expanded", "true")
    expect(nav).to_be_visible()
    page.keyboard.press("Escape")
    expect(toggle).to_have_attribute("aria-expanded", "false")
    expect(toggle).to_be_focused()
    toggle.click()
    nav.locator('a[href^="#"]').first.click()
    expect(toggle).to_have_attribute("aria-expanded", "false")


def scene_motion(page):
    control = page.locator("[data-scene-motion]")
    video = page.locator(".school-blender-video")
    expect(control).to_have_text("Play motion")
    expect(control).to_have_attribute("aria-pressed", "false")
    assert video.get_attribute("src") is None, "Video downloaded before opt-in"
    control.scroll_into_view_if_needed()
    control.click()
    expect(control).to_have_text("Pause scene")
    page.wait_for_function("""() => {
      const v=document.querySelector('.school-blender-video');
      return v.videoWidth >= 720 && !v.paused && v.currentTime > 0.1;
    }""")
    expect(page.locator(".school-hero")).to_have_class(re.compile(r"\bscene-running\b"))
    page.locator("#programs").scroll_into_view_if_needed()
    page.wait_for_function("document.querySelector('.school-blender-video').paused")
    control.scroll_into_view_if_needed()
    page.wait_for_function("!document.querySelector('.school-blender-video').paused")
    control.click()
    expect(control).to_have_text("Play motion")
    expect(control).to_have_attribute("aria-pressed", "false")
    page.wait_for_function("document.querySelector('.school-blender-video').paused")
    expect(page.locator(".school-hero")).not_to_have_class(re.compile(r"\bscene-running\b"))


def program_journey(page, directory, label):
    paths = []
    for program_id, name, slug in PROGRAMS:
        choice = page.locator(f'[data-school-choice="{program_id}"]')
        choice.focus()
        page.keyboard.press("Space")
        expect(choice).to_be_focused()
        expect(choice).to_have_attribute("aria-pressed", "true")
        expect(page.locator('[data-school-choice][aria-pressed="true"]')).to_have_count(1)
        expect(page.locator("[data-school-title]")).to_have_text(name)
        assert parse_qs(urlparse(page.url).query).get("program") == [slug], page.url
        expect(page.locator("[data-school-status]")).to_contain_text(name)
        detail = page.locator("[data-school-detail]").get_attribute("href")
        assert detail and detail.startswith("/") and slug in detail, detail
        paths.append(detail)
        for link in page.locator("[data-selected-apply],[data-school-apply]").all():
            application = link.get_attribute("href")
            assert urlparse(application).path == "/apply.html", application
            assert parse_qs(urlparse(application).query).get("program") == [slug], application
        no_overflow(page)
        page.locator("[data-school-title]").scroll_into_view_if_needed()
        page.screenshot(path=str(directory / f"{label}-program-{program_id}.png"))
    weeks = page.locator("ol.school-weeks")
    expect(weeks.locator(":scope > li")).to_have_count(4)
    for index, number in enumerate((1, 4, 8, 12)):
        stage = weeks.locator(":scope > li").nth(index)
        expect(stage.locator(":scope > span")).to_have_text("Week")
        expect(stage.locator(":scope > strong")).to_have_text(str(number))
        expect(stage.locator("h3")).to_be_visible()
    return paths


def supporting_pages(page, base, directory, label, programs):
    paths = ["/about.html", "/organizations.html", "/contact.html", "/media.html",
             "/privacy.html", "/terms.html", "/accessibility.html", "/apply.html",
             "/programs.html", "/experience.html", "/enrollment-fees.html",
             "/credential-standards.html", "/verify.html", *programs]
    for path in dict.fromkeys(paths):
        response = page.goto(base + path, wait_until="domcontentloaded")
        assert response and response.ok, f"Failed {path}"
        expect(page.locator("h1")).to_be_visible()
        metadata(page, urlparse(path).path)
        no_overflow(page)
        if urlparse(path).path == "/apply.html":
            expect(page.locator("body")).to_contain_text(re.compile(
                r"applications? (?:are |is )?not (?:yet )?available|applications? (?:are |is )?not open", re.I))
            expect(page.locator("form")).to_have_count(0)
            assert not page.locator('a[href*="canada.sozorock.com/apply"]').count()
            page.screenshot(path=str(directory / f"{label}-apply-unavailable.png"), full_page=True)
        if path == "/contact.html":
            configured = page.evaluate("Boolean(window.SOZOROCK_CONTACT?.apiEndpoint)")
            if not configured:
                expect(page.locator("[data-contact-root] form")).to_have_count(0)
                expect(page.locator("[data-contact-root]")).to_contain_text(
                    "does not collect or store your information")


def reduced_motion(browser, base, directory):
    context = browser.new_context(viewport={"width":390,"height":844}, reduced_motion="reduce")
    try:
        page = context.new_page()
        open_home(page, base)
        assert page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches")
        expect(page.locator("[data-scene-motion]")).to_be_hidden()
        assert page.locator("video[autoplay],audio[autoplay]").count() == 0
        assert page.evaluate("""document.getAnimations().filter(a=>a.playState==='running'
          && a.effect?.getComputedTiming().iterations===Infinity).length""") == 0
        no_overflow(page)
        page.screenshot(path=str(directory / "390-reduced-motion.png"))
    finally:
        context.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default=CANONICAL)
    parser.add_argument("--output-dir", default=str(Path(os.getenv("RUNNER_TEMP", "/tmp")) / "sozorock-public-qa"))
    args = parser.parse_args()
    base = validated_base(args.base_url)
    directory = Path(args.output_dir)
    directory.mkdir(parents=True, exist_ok=True)
    chrome = shutil.which("google-chrome") or shutil.which("google-chrome-stable")
    if not chrome:
        raise RuntimeError("Acceptance runner must provide Google Chrome")
    results = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, executable_path=chrome)
        try:
            for width, height in VIEWPORTS:
                label = f"{width}x{height}"
                context = browser.new_context(viewport={"width":width,"height":height},
                    is_mobile=width<800, has_touch=width<800, reduced_motion="no-preference")
                page = context.new_page()
                page.set_default_timeout(20000)
                page.set_default_navigation_timeout(30000)
                errors, console_errors = [], []
                page.on("pageerror", lambda error: errors.append(str(error)))
                page.on("console", lambda message: console_errors.append(message.text) if message.type=="error" else None)
                record = {"viewport":label,"passed":False}
                try:
                    open_home(page, base)
                    record["hero_bounds"] = hero_bounds(page)
                    capture_scroll(page, directory, label)
                    keyboard_menu(page, width<800)
                    scene_motion(page)
                    programs = program_journey(page, directory, label)
                    supporting_pages(page, base, directory, label, programs)
                    assert not errors, errors
                    assert not [e for e in console_errors if "ERR_ABORTED" not in e], console_errors
                    record["passed"] = True
                except Exception as error:
                    record["error"] = str(error)
                    try:
                        page.screenshot(path=str(directory / f"{label}-failure.png"), full_page=True)
                    except Exception:
                        pass
                finally:
                    record.update(page_errors=errors, console_errors=console_errors)
                    results.append(record)
                    context.close()
                print(json.dumps(record), flush=True)
            record = {"check":"reduced-motion","passed":False}
            try:
                reduced_motion(browser, base, directory)
                record["passed"] = True
            except Exception as error:
                record["error"] = str(error)
            results.append(record)
        finally:
            browser.close()
    (directory / "results.json").write_text(json.dumps(results, indent=2)+"\n", encoding="utf-8")
    passed = all(result["passed"] for result in results)
    print("PASS: Open School journeys, three viewports, supporting pages, reduced motion"
          if passed else "FAIL: inspect results.json and screenshots", flush=True)
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
