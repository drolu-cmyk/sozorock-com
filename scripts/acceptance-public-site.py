#!/usr/bin/env python3
"""Read-only Chrome acceptance checks against the deployed US public website.

Run in the existing deployment workflow. Screenshots and results go to a temporary
artifact directory; the checks never submit forms or change application data.
"""

import argparse
import json
import os
from pathlib import Path
import re
import shutil
import sys
from urllib.parse import urlparse

from playwright.sync_api import expect, sync_playwright


VIEWPORTS = ((1440, 1000), (390, 844), (375, 667))
PROGRAMS = (
    ("ai", "Applied AI Systems"),
    ("grc", "Cybersecurity GRC"),
    ("iam", "Identity & Access Management"),
    ("governance", "AI Governance"),
)


def no_overflow(page):
    bounds = page.evaluate("""() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth
    })""")
    assert max(bounds["document"], bounds["body"]) <= bounds["viewport"] + 1, bounds


def open_home(page, base):
    response = page.goto(base + "/", wait_until="domcontentloaded")
    assert response and response.ok, "Homepage request failed"
    expect(page).to_have_title("SozoRockSchool — Learn it. Put it to work.")
    expect(page.locator(".hero h1")).to_have_text(re.compile(r"Learn it\.\s*Put it to work\."))
    expect(page.locator("vite-error-overlay")).to_have_count(0)
    page.wait_for_function("""() => {
      const image = document.querySelector('img.hero-image');
      return image?.complete && image.naturalWidth > 1000 && document.fonts.status === 'loaded';
    }""")


def hero_bounds(page):
    measurements = page.evaluate("""() => {
      const box = element => {
        const r = element.getBoundingClientRect();
        return {x:r.x, y:r.y, right:r.right, bottom:r.bottom, width:r.width, height:r.height};
      };
      return {
        viewport: document.documentElement.clientWidth,
        hero: box(document.querySelector('.hero')),
        image: box(document.querySelector('img.hero-image')),
        motion: box(document.querySelector('.motion-control')),
        content: [...document.querySelectorAll('.hero h1,.hero-copy>p,.hero-actions>a,.hero-foot>span,header nav>a,header .brand')].map(element => ({text:element.textContent, ...box(element)})),
        nav: [...document.querySelectorAll('header nav>a')].map(box)
      };
    }""")
    hero, image, motion = (measurements[key] for key in ("hero", "image", "motion"))
    assert abs(image["x"]) <= 1, measurements
    assert abs(image["width"] - measurements["viewport"]) <= 1, measurements
    assert abs(image["y"] - hero["y"]) <= 1 and abs(image["height"] - hero["height"]) <= 1, measurements
    for content in [motion, *measurements["content"]]:
        assert content["width"] > 0 and content["height"] > 0, content
        assert content["x"] >= hero["x"] - 1 and content["right"] <= hero["right"] + 1, content
        assert content["y"] >= hero["y"] - 1 and content["bottom"] <= hero["bottom"] + 1, content
    for content in measurements["content"]:
        overlap = min(content["right"], motion["right"]) > max(content["x"], motion["x"]) + 1 and min(content["bottom"], motion["bottom"]) > max(content["y"], motion["y"]) + 1
        assert not overlap, {"motion": motion, "content": content}
    for previous, following in zip(measurements["nav"], measurements["nav"][1:]):
        assert previous["right"] <= following["x"] + 1 or previous["bottom"] <= following["y"] + 1, measurements["nav"]
    no_overflow(page)
    return measurements


def motion_and_keyboard(page):
    page.wait_for_function("""() => {
      const video = document.querySelector('video.hero-video');
      return video && !video.paused && video.currentTime > 0;
    }""")
    pause = page.get_by_role("button", name="Pause hero motion", exact=True)
    expect(pause).to_be_visible()
    # The first native Tab stop is the skip link, followed by the motion control.
    page.keyboard.press("Tab")
    expect(page.get_by_role("link", name="Skip to programs", exact=True)).to_be_focused()
    page.keyboard.press("Tab")
    expect(pause).to_be_focused()
    assert pause.evaluate("element => element.matches(':focus-visible') && getComputedStyle(element).outlineStyle !== 'none'"), "No visible keyboard focus"
    page.keyboard.press("Enter")
    play = page.get_by_role("button", name="Play hero motion", exact=True)
    expect(play).to_be_visible()
    assert page.locator("video.hero-video").evaluate("video => video.paused")
    paused_time = page.locator("video.hero-video").evaluate("video => video.currentTime")
    page.wait_for_timeout(250)  # Verify a paused frame stays still across real time.
    assert abs(page.locator("video.hero-video").evaluate("video => video.currentTime") - paused_time) < 0.05
    page.keyboard.press("Enter")
    expect(pause).to_be_visible()
    page.wait_for_function("document.querySelector('video.hero-video').paused === false")
    pause.click()
    expect(play).to_be_visible()
    page.keyboard.press("Escape")


def program_journey(page):
    picker = page.locator(".program-picker")
    practice = page.locator(".practice")
    for program_id, name in PROGRAMS:
        choice = picker.get_by_role("button", name=name, exact=True)
        choice.click()
        expect(choice).to_have_attribute("aria-pressed", "true")
        expect(picker.locator('button[aria-pressed="true"]')).to_have_count(1)
        expect(picker.locator(".small-link")).to_have_attribute("href", "#program-" + program_id)
        if program_id == "ai":
            practice.get_by_role("button", name="Review here").nth(0).click()
            expect(practice.get_by_role("status")).to_contain_text("Reconsider the timing")
            practice.get_by_role("button", name="Review here").nth(1).click()
            expect(practice.get_by_role("status")).to_contain_text("A considered choice.")
        elif program_id == "grc":
            recommendation = practice.get_by_role("button", name="Request the review record and owner", exact=True)
            expect(recommendation).to_be_disabled()
            practice.get_by_role("button", name="Inspect the vendor’s evidence", exact=True).click()
            expect(recommendation).to_be_enabled()
            recommendation.click()
            expect(practice.get_by_role("status")).to_contain_text("A policy describes intent.")
        elif program_id == "iam":
            check = practice.get_by_role("button", name="Check this access decision", exact=True)
            check.click()
            expect(practice.get_by_role("status")).to_contain_text("Match the permission to the task")
            practice.get_by_label("Project permission", exact=True).select_option("read")
            practice.get_by_label("Access expires", exact=True).select_option("30")
            check.click()
            expect(practice.get_by_role("status")).to_contain_text("This scope matches the task.")
        else:
            review = practice.get_by_role("button", name="Review readiness", exact=True)
            review.click()
            expect(practice.get_by_role("status")).to_contain_text("The review plan has gaps.")
            for checkbox in practice.get_by_role("checkbox").all():
                checkbox.check()
            review.click()
            expect(practice.get_by_role("status")).to_contain_text("Review plan assembled.")
        no_overflow(page)
    page.locator("#program-ai").get_by_role("button", name="Try an AI workflow decision", exact=True).click()
    expect(practice.locator("h3")).to_be_focused()
    expect(picker.get_by_role("button", name="Applied AI Systems", exact=True)).to_have_attribute("aria-pressed", "true")


def supporting_pages(page, base, screenshots, label):
    for slug in ("about", "organizations", "contact", "media", "privacy", "terms", "accessibility"):
        response = page.goto(f"{base}/{slug}.html", wait_until="domcontentloaded")
        assert response and response.ok, f"{slug} page request failed"
        expect(page.locator("h1")).to_be_visible()
        expect(page.locator('link[rel="canonical"]')).to_have_attribute("href", f"{base}/{slug}.html")
        no_overflow(page)
        if slug == "contact":
            configured = page.evaluate("Boolean(window.SOZOROCK_CONTACT?.apiEndpoint)")
            if configured:
                expect(page.locator("[data-contact-root] form")).to_be_visible()
                expect(page.get_by_label("Email address", exact=True)).to_be_visible()
                expect(page.get_by_role("button", name="Send enquiry", exact=True)).to_be_visible()
                expect(page.locator("[data-contact-root] [role=status]")).to_be_empty()
            else:
                expect(page.get_by_role("heading", name="Online enquiries are not available yet.", exact=True)).to_be_visible()
                expect(page.locator("[data-contact-root] form")).to_have_count(0)
                expect(page.locator("[data-contact-root]")).to_contain_text("does not collect or store your information")
            page.screenshot(path=str(screenshots / f"{label}-contact.png"), full_page=True)


def reduced_motion(browser, base, screenshots):
    context = browser.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
    page = context.new_page()
    page.set_default_timeout(20000)
    try:
        open_home(page, base)
        video = page.locator("video.hero-video")
        assert video.get_attribute("src") is None, "Reduced-motion preference still downloaded autoplay video"
        assert video.evaluate("video => video.paused")
        expect(page.get_by_role("button", name="Play hero motion", exact=True)).to_be_visible()
        page.screenshot(path=str(screenshots / "390-reduced-motion.png"), full_page=False)
    finally:
        context.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="https://www.sozorock.com")
    parser.add_argument("--output-dir", default=str(Path(os.getenv("RUNNER_TEMP", "/tmp")) / "sozorock-public-qa"))
    args = parser.parse_args()
    base = args.base_url.rstrip("/")
    assert urlparse(base).scheme == "https" and urlparse(base).netloc == "www.sozorock.com", "Only the canonical US production host is supported"
    screenshots = Path(args.output_dir)
    screenshots.mkdir(parents=True, exist_ok=True)
    chrome = shutil.which("google-chrome") or shutil.which("google-chrome-stable")
    if not chrome:
        raise RuntimeError("The deployment runner must provide Google Chrome for H.264 video verification")
    results = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, executable_path=chrome)
        try:
            for width, height in VIEWPORTS:
                label = f"{width}x{height}"
                context = browser.new_context(viewport={"width": width, "height": height}, is_mobile=width < 800, has_touch=width < 800, reduced_motion="no-preference")
                page = context.new_page()
                page.set_default_timeout(20000)
                page.set_default_navigation_timeout(30000)
                errors, console_errors = [], []
                page.on("pageerror", lambda error: errors.append(str(error)))
                page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
                record = {"viewport": label, "passed": False}
                try:
                    open_home(page, base)
                    motion_and_keyboard(page)
                    page.evaluate("window.scrollTo({top:0, behavior:'instant'})")
                    record["hero_bounds"] = hero_bounds(page)
                    page.screenshot(path=str(screenshots / f"{label}-hero.png"), full_page=False)
                    page.screenshot(path=str(screenshots / f"{label}-homepage.png"), full_page=True)
                    program_journey(page)
                    supporting_pages(page, base, screenshots, label)
                    assert not errors, errors
                    # Navigation can cancel a video range request normally. Other
                    # console errors remain a release finding, including assets.
                    assert not [message for message in console_errors if "ERR_ABORTED" not in message], console_errors
                    record["passed"] = True
                except Exception as error:
                    record["error"] = str(error)
                    try:
                        page.screenshot(path=str(screenshots / f"{label}-failure.png"), full_page=True)
                    except Exception:
                        pass
                finally:
                    record["page_errors"] = errors
                    record["console_errors"] = console_errors
                    results.append(record)
                    context.close()
                print(json.dumps(record), flush=True)
            reduced = {"check": "reduced-motion", "passed": False}
            try:
                reduced_motion(browser, base, screenshots)
                reduced["passed"] = True
            except Exception as error:
                reduced["error"] = str(error)
            results.append(reduced)
        finally:
            browser.close()
    (screenshots / "results.json").write_text(json.dumps(results, indent=2) + "\n", encoding="utf-8")
    passed = all(result["passed"] for result in results)
    print("PASS: desktop, two mobile sizes, four program journeys, supporting pages and reduced motion" if passed else "FAIL: inspect results.json and screenshots", flush=True)
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
