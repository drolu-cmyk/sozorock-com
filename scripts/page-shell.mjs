import { ORIGIN } from '../src/site.mjs';

export const escape = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');

export function metadata({path,title,description,school=false,image,course,noindex=false}) {
  const url=ORIGIN+path, name=school?'SozoRockSchool':'SozoRock Technology';
  const share=image||('/assets/social/'+(school?'school-v1.png':path.startsWith('/cb-cap')?'cb-cap-v2.jpg':'corporate-v2.jpg'));
  const company={'@type':'Organization','@id':ORIGIN+'/#organization',name:'SozoRock Technology',legalName:'SozoRock Tech Inc.',url:ORIGIN+'/',logo:ORIGIN+'/favicon.svg'};
  const schoolEntity={'@type':'EducationalOrganization','@id':ORIGIN+'/school#school',name:'SozoRockSchool',url:ORIGIN+'/school',parentOrganization:{'@id':company['@id']}};
  const personId=ORIGIN+'/about#leadership';
  const provider={'@id':school?schoolEntity['@id']:company['@id']};
  const graph=[company];
  if(school)graph.push(schoolEntity);
  if(path==='/about'||path==='/school/about'){
    graph.push({'@type':'Person','@id':personId,name:'Dr. Oluwabiyi Adeyemo',url:ORIGIN+'/about#leadership',image:ORIGIN+'/media/director.webp',jobTitle:school?'Director of Learning, AI & Cybersecurity':'Director, Technology & Strategic Initiatives',worksFor:provider});
  }
  const pageType=path.endsWith('/about')?'AboutPage':path.endsWith('/contact')||path.endsWith('/request-demo')?'ContactPage':path==='/insights'?'CollectionPage':'WebPage';
  graph.push({'@type':'WebSite','@id':ORIGIN+'/#website',name:'SozoRock Technology',url:ORIGIN+'/',publisher:{'@id':company['@id']},inLanguage:'en-US'},
    {'@type':'ImageObject','@id':url+'#primaryimage',url:ORIGIN+share,width:1200,height:630,caption:title},
    {'@type':pageType,'@id':url+'#page',url,name:title,description,isPartOf:{'@id':ORIGIN+'/#website'},publisher:provider,inLanguage:'en-US',primaryImageOfPage:{'@id':url+'#primaryimage'},...(path==='/about'||path==='/school/about'?{about:[provider,{'@id':personId}]}:{})});
  if(path==='/cb-cap')graph.push({'@type':'Product','@id':url+'#product',name:'CB-CAP',description,url,brand:{'@id':company['@id']},category:'Spatial intelligence for care access'});
  if(path.startsWith('/what-we-do/'))graph.push({'@type':'Service','@id':url+'#service',name:title.split(' | ')[0],serviceType:title.split(' | ')[0],description,url,provider});
  if(path.startsWith('/insights/'))graph.push({'@type':'Article','@id':url+'#article',headline:title.split(' | ')[0],description,image:ORIGIN+share,inLanguage:'en-US',datePublished:'2026-09-09',author:{'@id':company['@id']},publisher:{'@id':company['@id']},mainEntityOfPage:{'@id':url+'#page'}});
  if(course)graph.push({'@type':'Course','@id':url+'#course',url,name:course[2],description:course[5],provider,timeRequired:'P12W',inLanguage:'en-US'});
  if(path!=='/'&&!noindex){
    const trail=[{name:'SozoRock Technology',item:ORIGIN+'/'}];
    if(school&&path!=='/school')trail.push({name:'School',item:ORIGIN+'/school'});
    if(path.startsWith('/school/programs/'))trail.push({name:'Programs',item:ORIGIN+'/school/programs'});
    if(path.startsWith('/what-we-do/'))trail.push({name:'What we do',item:ORIGIN+'/what-we-do'});
    if(path.startsWith('/insights/'))trail.push({name:'Insights',item:ORIGIN+'/insights'});
    if(path.startsWith('/cb-cap/'))trail.push({name:'CB-CAP',item:ORIGIN+'/cb-cap'});
    trail.push({name:title.split(' | ')[0],item:url});
    graph.push({'@type':'BreadcrumbList',itemListElement:trail.map((x,i)=>({'@type':'ListItem',position:i+1,...x}))});
  }
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta name="robots" content="${noindex?'noindex,follow':'index,follow,max-image-preview:large'}"><link rel="canonical" href="${url}"><meta property="og:type" content="${path.startsWith('/insights/')?'article':'website'}"><meta property="og:site_name" content="${name}"><meta property="og:locale" content="en_US"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${ORIGIN+share}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${escape(title)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${ORIGIN+share}"><meta name="twitter:image:alt" content="${escape(title)}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon-48.png" sizes="48x48"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}</script>`;
}
