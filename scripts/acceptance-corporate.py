"""Read-only corporate browser acceptance. All enquiry requests are intercepted."""
import argparse, json, os, shutil
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROUTES=['/','/what-we-build','/work','/work/cb-cap','/work/place-intelligence','/company','/contact','/privacy','/terms','/accessibility','/legal']
WIDTHS=[320,375,390,430,768,1024,1280,1440,1920]
def main():
    parser=argparse.ArgumentParser();parser.add_argument('--base-url',required=True);parser.add_argument('--output-dir',type=Path,required=True);args=parser.parse_args()
    base=args.base_url.rstrip('/');assert base=='https://www.sozorock.com' or base.startswith('http://127.0.0.1:')
    out=args.output_dir;out.mkdir(parents=True,exist_ok=True);results=[]
    executable=next((p for p in [shutil.which('google-chrome'),r'C:\Program Files\Google\Chrome\Application\chrome.exe',r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'] if p and Path(p).exists()),None)
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,executable_path=executable)
        context=browser.new_context(reduced_motion='reduce');page=context.new_page();errors=[]
        page.on('pageerror',lambda error:errors.append(str(error)))
        page.route('**/enquiries',lambda route:route.abort())
        for width in WIDTHS:
            page.set_viewport_size({'width':width,'height':1000 if width>1000 else 844})
            for path in ROUTES:
                response=page.goto(base+path,wait_until='networkidle');assert response.status==200,(path,response.status)
                expect(page.locator('h1')).to_have_count(1)
                expect(page.locator('link[rel=canonical]')).to_have_attribute('href','https://www.sozorock.com'+path)
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(width,path,'overflow')
                assert page.locator('main').inner_text().strip()
                for script in page.locator('script[type="application/ld+json"]').all_text_contents():json.loads(script)
                assert page.evaluate("!performance.getEntriesByType('resource').some(r=>/school-|open-school|source-sans|plus-jakarta/.test(r.name)&&r.initiatorType==='css')")
                if path=='/':
                    page.locator('.joint-art img').wait_for();page.wait_for_function("() => document.querySelector('.joint-art img').complete && document.querySelector('.joint-art img').naturalWidth>0")
                    if width<=768:
                        button=page.locator('.corporate-menu');button.click();expect(button).to_have_attribute('aria-expanded','true')
                        page.keyboard.press('Shift+Tab');expect(button).to_be_focused();page.keyboard.press('Tab');expect(page.locator('#corporate-nav a').first).to_be_focused()
                        page.keyboard.press('Escape');expect(button).to_have_attribute('aria-expanded','false');expect(button).to_be_focused()
                    if width in [390,1440]:page.screenshot(path=str(out/f'home-{width}.png'),full_page=True)
                if width in [390,1440] and path in ['/work/cb-cap','/contact']:
                    page.screenshot(path=str(out/(path.strip('/').replace('/','-')+f'-{width}.png')),full_page=True)
            results.append({'width':width,'routes':len(ROUTES),'overflow':False,'passed':True});print(json.dumps(results[-1]),flush=True)
        response=page.goto(base+'/this-page-does-not-exist');assert response.status==404
        response=page.goto(base+'/assets/missing-release-check.webp');assert response.status==404
        expect(page.locator('h1')).to_contain_text('not here')
        if base=='https://www.sozorock.com':
            redirect=page.request.get('https://sozorock.com/apply.html?program=ai-governance&tag=a&tag=b%20c',max_redirects=0)
            assert redirect.status==301 and redirect.headers['location']=='https://www.sozorock.com/school/apply?program=ai-governance&tag=a&tag=b%20c'
        page.goto(base+'/?source=a&source=b#programs');page.wait_for_url('**/school?source=a&source=b#programs')
        # Simulate an uncertain server receipt and verify retry identity and details persist.
        context.route('**/engagement-config.js',lambda r:r.fulfill(status=200,content_type='application/javascript',body='window.SOZOROCK_CONTACT={apiEndpoint:"https://8z9jdpp371.execute-api.us-east-1.amazonaws.com"};'))
        attempts=[]
        def enquiry(route):
            data=route.request.post_data_json;attempts.append(data)
            route.fulfill(status=200,content_type='application/json',headers={'access-control-allow-origin':'*'},body=json.dumps({'id':'wrong-id' if len(attempts)==1 else data['requestId']}))
        page.unroute('**/enquiries');page.route('**/enquiries',enquiry)
        page.goto(base+'/contact');page.get_by_label('Your name').fill('Synthetic QA');page.get_by_label('Email address').fill('qa@example.invalid');page.get_by_label('Organization (optional)').fill('Synthetic release QA');page.get_by_label('Your message').fill('Synthetic test of durable receipt display. No response needed.')
        page.get_by_role('button',name='Send enquiry').click();expect(page.get_by_role('status')).to_contain_text('could not be confirmed')
        expect(page.get_by_label('Your name')).to_have_value('Synthetic QA');page.get_by_role('button',name='Send enquiry').click();expect(page.get_by_role('status')).to_contain_text('Your enquiry was received')
        assert attempts[0]==attempts[1] and attempts[0]['context']=='corporate'
        nojs=browser.new_context(java_script_enabled=False,viewport={'width':320,'height':844});fallback=nojs.new_page()
        for path in ROUTES:
            fallback.goto(base+path);assert fallback.locator('h1').inner_text();expect(fallback.get_by_role('navigation',name='Primary')).to_be_visible()
            assert fallback.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),('nojs',path)
        assert not errors,errors
        (out/'acceptance.json').write_text(json.dumps({'passed':True,'viewports':results,'noJavaScript':True,'contactReceiptFaultInjection':True,'pageErrors':errors,'scope':'Chromium lab checks, not a complete WCAG certification'},indent=2))
        browser.close()
if __name__=='__main__':main()
