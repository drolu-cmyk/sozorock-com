export function renderWorkplaceShell({navigation,today,employee}){
  const nav=navigation.map(n=>`<a href="${n.href}" data-surface="${n.id}">${n.label}${n.badge?` <span aria-label="${n.badge} unread">${n.badge}</span>`:""}</a>`).join("");
  const next=today.briefing.next_meeting;
  const summary=[
    today.briefing.unread_messages?`${today.briefing.unread_messages} unread message${today.briefing.unread_messages===1?"":"s"}`:null,
    next?`Your ${new Date(next.start_at).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})} ${next.title} starts soon.`:null
  ].filter(Boolean).join(" ");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Practice Studio</title></head>
<body>
<a href="#main">Skip to workday</a>
<header><strong>Practice Studio</strong><div>${employee.role_title??employee.role_id}</div><nav aria-label="Workplace">${nav}</nav></header>
<main id="main">
<p>${today.date_label}</p>
<h1>${today.greeting}</h1>
<p aria-live="polite">${summary}</p>
<section aria-labelledby="today-heading"><h2 id="today-heading">Today</h2>
<ul>${today.timeline.map(x=>`<li><span>${x.type.replace("_"," ")}</span> <strong>${x.title}</strong></li>`).join("")}</ul>
</section>
</main></body></html>`;
}
