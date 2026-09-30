export function buildWorkSurface(items){
  return {surface:"work",groups:{
    active:items.filter(x=>x.status==="active"),
    waiting:items.filter(x=>x.status==="waiting"),
    review:items.filter(x=>x.status==="review"),
    completed:items.filter(x=>x.status==="completed")
  }};
}

export function buildPeopleSurface({people,employee}){
  return {surface:"people",manager:people.find(p=>p.person_id===employee.manager_id)??null,
    team:people.filter(p=>p.team===employee.team_id),directory:people};
}

export function buildFilesSurface(files){
  return {surface:"files",files:files.map(f=>({
    file_id:f.file_id,title:f.title,kind:f.kind,updated_at:f.updated_at,
    context_id:f.context_id,author:f.author
  }))};
}
