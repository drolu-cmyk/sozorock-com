from pathlib import Path
from playwright.sync_api import sync_playwright
import re
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe');page=b.new_page(viewport={'width':1200,'height':630});page.goto('http://127.0.0.1:4175/')
 for key,title,src in [('corporate','Technology that holds up.','joint-desktop-v1.webp'),('school','Applied learning.','open-school-us-wide.webp'),('cb-cap','County evidence.','evidence/cb-cap-v1.webp'),('place-intelligence','Keep the source in view.','evidence/place-intelligence-v1.webp')]:
  font='plus-jakarta-sans-latin' if key=='school' else 'instrument-sans-latin';brand='SozoRockSchool' if key=='school' else 'SozoRock Technology'
  page.set_content(f'''<style>@font-face{{font-family:Brand;src:url('/assets/fonts/{font}.woff2')}}*{{box-sizing:border-box}}body{{margin:0;background:white;color:#111315;font-family:Brand}}main{{padding:38px 52px}}p{{font-size:28px;margin:0}}h1{{font-size:48px;line-height:1.1;letter-spacing:-.03em;font-weight:500;margin:24px 0 38px}}img{{height:400px;max-width:1096px;object-fit:contain;display:block;margin:auto}}</style><main><p>{brand}</p><h1>{title}</h1><img src='/assets/{src}'></main>''',wait_until='networkidle');page.evaluate('document.fonts.ready');page.screenshot(path=f'public/assets/social/{key}-v1.png')
 svg=Path('public/favicon.svg').read_text()
 for size,name in [(48,'favicon-48.png'),(180,'apple-touch-icon.png')]:
  page.set_viewport_size({'width':size,'height':size});page.set_content('<style>body{margin:0}svg{display:block;width:100vw;height:100vh}</style>'+svg);page.screenshot(path='public/'+name,omit_background=True)
 b.close()
