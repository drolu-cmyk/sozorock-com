"""Local candidate only. All authentication and record responses are synthetic."""
import argparse
import json
import shutil
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

parser = argparse.ArgumentParser()
parser.add_argument('--base-url', required=True)
args = parser.parse_args()
assert args.base_url.startswith('http://127.0.0.1:')
endpoint = 'https://q9l0fuov97.execute-api.us-east-1.amazonaws.com'
cfg = {'apiEndpoint': endpoint, 'adminClientId': 'testclient',
       'adminLoginOrigin': 'https://sozorock-us-admin-791860731989.auth.us-east-1.amazoncognito.com'}
executable = next((p for p in [shutil.which('google-chrome'),
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'] if p and Path(p).exists()), None)
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path=executable)
    context = browser.new_context(viewport={'width':390,'height':844})
    context.route('**/applications-config.js', lambda r: r.fulfill(content_type='application/javascript', body='window.SOZOROCK_APPLICATIONS='+json.dumps(cfg)))
    context.add_init_script("sessionStorage.setItem('sozorock_us_admin_access',JSON.stringify({accessToken:'synthetic',expiresAt:Date.now()+60000}))")
    pending=[]
    def application(route):
        pending.append(route)
    context.route(endpoint+'/admin/applications*', application)
    calls=[]
    def enquiries(route):
        calls.append(route.request.url)
        assert route.request.headers.get('authorization') == 'Bearer synthetic'
        body = {'items': [], 'nextCursor':'synthetic-page'} if len(calls)==1 else {'items':[{'id':'synthetic-enquiry','name':'<img src=x onerror=alert(1)>','message':'Synthetic enquiry','createdAt':1}], 'nextCursor':None}
        route.fulfill(content_type='application/json',body=json.dumps(body))
    context.route(endpoint+'/admin/enquiries*', enquiries)
    page=context.new_page();page.goto(args.base_url+'/admin.html')
    expect(page.locator('#admin-status')).to_contain_text('Loading applications')
    page.get_by_label('View records').select_option('enquiries')
    expect(page.locator('#admin-count')).to_contain_text('0 matching / 0 loaded enquiries. More are available.')
    page.get_by_role('button',name='Load more').click()
    expect(page.locator('#admin-records')).to_contain_text('<img src=x onerror=alert(1)>')
    assert page.locator('#admin-records img').count()==0
    assert 'cursor=synthetic-page' in calls[-1]
    for route in pending:
        try:route.fulfill(content_type='application/json',body=json.dumps({'items':[{'id':'stale','name':'Stale application'}],'nextCursor':None}))
        except Exception:pass  # Aborted requests may already have been removed by Chromium.
    expect(page.locator('#admin-records')).not_to_contain_text('Stale application')
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
    context.unroute(endpoint+'/admin/enquiries*')
    context.route(endpoint+'/admin/enquiries*',lambda r:r.fulfill(status=403,content_type='application/json',body='{}'))
    page.get_by_role('button',name='Refresh').click()
    expect(page.locator('#admin-content')).to_be_hidden()
    assert page.locator('#admin-records').inner_text()==''
    context.close()
    context=browser.new_context()
    context.route('**/applications-config.js',lambda r:r.fulfill(content_type='application/javascript',body='window.SOZOROCK_APPLICATIONS='+json.dumps(cfg)))
    context.add_init_script("sessionStorage.setItem('sozorock_us_admin_access',JSON.stringify({accessToken:'synthetic',expiresAt:Date.now()+1500}))")
    context.route(endpoint+'/**',lambda r:r.fulfill(content_type='application/json',body=json.dumps({'items':[{'id':'synthetic','name':'Temporary application'}],'nextCursor':None})))
    page=context.new_page();page.goto(args.base_url+'/admin.html')
    expect(page.locator('#admin-records')).to_contain_text('Temporary application')
    expect(page.locator('#admin-content')).to_be_hidden(timeout=5000)
    assert page.locator('#admin-records').inner_text()==''
    context.close()
    context=browser.new_context(viewport={'width':390,'height':844})
    context.route('**/applications-config.js',lambda r:r.fulfill(content_type='application/javascript',body='window.SOZOROCK_APPLICATIONS='+json.dumps(cfg)))
    context.add_init_script("sessionStorage.setItem('sozorock_us_admin_access',JSON.stringify({accessToken:'synthetic',expiresAt:Date.now()+60000}))")
    records=[{'id':'synthetic-app','name':'Synthetic Applicant','email':'synthetic@example.com','programme':'ai-governance','state':'NY','role':'Reviewer','availability':'3-6-hours','status':'received','version':0,'createdAt':1}]
    mutations=[]
    def workflow(route):
        assert route.request.headers.get('authorization')=='Bearer synthetic'
        if route.request.method=='GET':
            result={'items':records,'nextCursor':None}
        else:
            payload=route.request.post_data_json
            mutations.append(payload)
            assert payload['expectedVersion']==records[0]['version']
            records[0]['version']+=1
            records[0]['status']='offered' if route.request.url.endswith('/offer') else payload['status']
            result={key:records[0][key] for key in ['id','status','version']}
        route.fulfill(content_type='application/json',body=json.dumps(result))
    context.route(endpoint+'/admin/applications**',workflow)
    page=context.new_page();page.goto(args.base_url+'/admin.html')
    expect(page.locator('#admin-records')).to_contain_text('Synthetic Applicant')
    page.get_by_label('Search loaded applications').fill('no-match')
    expect(page.locator('#admin-records article')).to_have_count(0)
    page.get_by_label('Search loaded applications').fill('synthetic')
    page.get_by_role('combobox',name='Program',exact=True).select_option('ai-governance')
    page.get_by_text('Review history and actions',exact=True).click()
    page.get_by_role('combobox',name='Review status',exact=True).select_option('under_review')
    page.get_by_label('Internal review note (not shared with applicant)').fill('Synthetic internal review')
    page.get_by_role('button',name='Save review',exact=True).click()
    expect(page.locator('#admin-status')).to_contain_text('Saved')
    page.get_by_text('Review history and actions',exact=True).click()
    page.get_by_role('button',name='Issue offer',exact=True).click()
    expect(page.locator('#admin-records')).to_contain_text('offered')
    assert mutations[0]['note']=='Synthetic internal review'
    assert records[0]['version']==2
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
    context.close();browser.close()
print(json.dumps({'passed':True,'syntheticOnly':True,'pagination':True,'textRendering':True,'staleResponse':True,'sessionExpiry':True,'unauthorizedResponse':True}))
