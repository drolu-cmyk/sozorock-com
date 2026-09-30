import test from "node:test";import assert from "node:assert/strict";
import{buildNavigation}from"../src/ui/navigation.mjs";import{buildTodaySurface}from"../src/ui/today-surface.mjs";
import{resolveWorkplaceSurface}from"../src/ui/surface-router.mjs";import{buildEmployeeWorkplace}from"../src/ui/workplace-app.mjs";
const principal={employee_id:"e1",tenant_id:"t1",role_id:"iam-analyst"};
const employee={employee_id:"e1",preferred_name:"Olu",registered_name:"Olu Adeyemo",role_id:"iam-analyst",role_title:"Identity & Access Analyst"};
test("navigation uses workplace language only",()=>{const n=buildNavigation({principal});assert.deepEqual(n.map(x=>x.label),["Today","Work","People","Messages","Meetings","Files","Systems","Support"]);});
test("today is a workday briefing",()=>{const t=buildTodaySurface({employee,now:"2026-10-01T08:47:00-04:00",unreadMessages:[{id:"m1"},{id:"m2"}],meetings:[{meeting_id:"meet1",title:"team check-in",start_at:"2026-10-01T09:15:00-04:00"}],activeWork:[],requiredTraining:[],waitingOn:[]});assert.match(t.greeting,/Good morning, Olu/);assert.equal(t.briefing.unread_messages,2);});
test("surface access is server authorized",()=>{assert.equal(resolveWorkplaceSurface({surface:"messages",principal}).status,200);assert.equal(resolveWorkplaceSurface({surface:"unknown",principal}).status,404);});
test("shell contains no LMS progress language",()=>{const app=buildEmployeeWorkplace({principal,employee,now:"2026-10-01T08:47:00-04:00",messages:[],meetings:[],work:[],training:[]});assert.equal(/module|xp|streak|course progress/i.test(app.html),false);assert.match(app.html,/Skip to workday/);});
