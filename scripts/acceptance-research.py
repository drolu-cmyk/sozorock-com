"""Read-only research scenario and responsive checks. No external records are created."""
import argparse
import json
import shutil
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROUTE = '/research/autonomous-systems-assurance'
WIDTHS = [320, 375, 390, 430, 768, 1024, 1280, 1440]
OUTCOMES = ['ALLOW', 'VERIFY', 'HUMAN AUTHORIZATION', 'DENY', 'ISOLATE']


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base-url', required=True)
    parser.add_argument('--output-dir', required=True, type=Path)
    args = parser.parse_args()
    base = args.base_url.rstrip('/')
    assert base == 'https://www.sozorock.com' or base.startswith('http://127.0.0.1:')
    args.output_dir.mkdir(parents=True, exist_ok=True)
    executable = next((p for p in [shutil.which('google-chrome'), r'C:\Program Files\Google\Chrome\Application\chrome.exe', r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'] if p and Path(p).exists()), None)
    checks = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, executable_path=executable)
        # Native disclosures must provide the whole experience without JavaScript.
        for javascript in [True, False]:
            context = browser.new_context(java_script_enabled=javascript, reduced_motion='reduce')
            page = context.new_page()
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            for width in WIDTHS:
                page.set_viewport_size({'width': width, 'height': 900})
                response = page.goto(base + ROUTE, wait_until='networkidle')
                assert response.status == 200
                expect(page.locator('h1')).to_have_count(1)
                expect(page.locator('link[rel=canonical]')).to_have_attribute('href', 'https://www.sozorock.com' + ROUTE)
                for index, outcome in enumerate(OUTCOMES):
                    scenario = page.locator('.assurance-scenario').nth(index)
                    summary = scenario.locator('summary')
                    summary.focus()
                    expect(summary).to_be_focused()
                    assert summary.evaluate('el => getComputedStyle(el).outlineStyle') != 'none'
                    if scenario.get_attribute('open') is None:
                        page.keyboard.press('Enter')
                    expect(scenario.locator('.assurance-outcome h3')).to_have_text(outcome)
                    expect(scenario.locator('.assurance-outcome')).to_be_visible()
                    expect(scenario.locator('.assurance-path li')).to_have_count(7)
                    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), (width, javascript, outcome)
                    page.keyboard.press('Space')
                    expect(scenario.locator('.assurance-outcome')).not_to_be_visible()
                checks.append({'width': width, 'javascript': javascript, 'allOutcomes': True, 'keyboard': True, 'noOverflow': True})
            # 200% browser zoom is equivalent to halving the CSS viewport for reflow.
            # Also test text-only enlargement independently of that reflow check.
            page.set_viewport_size({'width': 640, 'height': 450})
            page.goto(base + ROUTE)
            page.add_style_tag(content='.assurance-demo p,.assurance-demo summary,.assurance-demo h3,.assurance-demo small{font-size:200%!important}')
            for summary in page.locator('.assurance-scenario summary').all():
                if summary.locator('..').get_attribute('open') is None:
                    summary.click()
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), ('text enlargement', javascript)
            page.screenshot(path=str(args.output_dir / ('research-enlarged-' + str(javascript) + '.png')), full_page=True)
            assert not errors, errors
            context.close()
        browser.close()
    (args.output_dir / 'research-acceptance.json').write_text(json.dumps({'passed': True, 'checks': checks, 'reducedMotion': True, 'textEnlargement': True, 'scope': 'Chromium keyboard, disclosure, metadata and reflow checks; not a manual screen-reader audit.'}, indent=2))
    print(json.dumps({'passed': True, 'checks': len(checks)}))


if __name__ == '__main__':
    main()
