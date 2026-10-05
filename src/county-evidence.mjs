export const countySource={publisher:'CDC PLACES',release:'2025 county release',released:'December 4, 2025',snapshot:'July 14, 2026',years:'BRFSS 2023/2022; Census 2023; ACS 2019–2023/2018–2022',url:'https://data.cdc.gov/500-Cities-Places/PLACES-County-Data-GIS-Friendly-Format-2025-releas/i46a-9kgh'};
export const countyMeasures={transport:'Lack of reliable transportation',uninsured:'Adults without health insurance',diabetes:'Diagnosed diabetes'};
export function validateCountySnapshot(rows) {
  const seen=new Set();
  if(!Array.isArray(rows)||rows.length!==3144)throw Error('County snapshot unavailable.');
  for(const row of rows){
    if(!/^\d{5}$/.test(row.fips)||seen.has(row.fips)||typeof row.state!=='string'||!row.state||typeof row.county!=='string'||!row.county)throw Error('County snapshot unavailable.');
    seen.add(row.fips);
    for(const key of Object.keys(countyMeasures)){
      const d=row[key];
      if(!Array.isArray(d)||d.length!==3)throw Error('County snapshot unavailable.');
      if(d.every(n=>n===null))continue;
      if(!d.every(n=>typeof n==='number'&&Number.isFinite(n))||d[1]<0||d[1]>d[0]||d[0]>d[2]||d[2]>100)throw Error('County snapshot unavailable.');
    }
  }
  return rows;
}
