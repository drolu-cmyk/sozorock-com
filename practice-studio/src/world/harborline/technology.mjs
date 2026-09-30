export const HARBORLINE_TECHNOLOGY=Object.freeze({
 identity:[
  {id:"entra",name:"Microsoft Entra ID",purpose:"workforce identity and federation"},
  {id:"aws-identity-center",name:"AWS IAM Identity Center",purpose:"cloud workforce access"}
 ],
 engineering:[
  {id:"github",name:"GitHub",purpose:"source control and engineering workflow"},
  {id:"actions",name:"GitHub Actions",purpose:"CI/CD"}
 ],
 cloud:[
  {id:"aws",name:"AWS",purpose:"primary cloud"},
  {id:"azure",name:"Microsoft Azure",purpose:"selected enterprise and client workloads"}
 ],
 work:[
  {id:"m365",name:"Microsoft 365",purpose:"email, calendar and documents"},
  {id:"jira",name:"Jira",purpose:"engineering and operational work tracking"}
 ],
 ai:[
  {id:"atlas",name:"Atlas",purpose:"internal enterprise knowledge assistant"},
  {id:"atlas-actions",name:"Atlas Actions",purpose:"constrained workflow actions",status:"controlled-rollout"}
 ]
});

export const HARBORLINE_REPOSITORIES=Object.freeze([
 {id:"atlas-app",name:"atlas-app",owner:"data-ai",classification:"internal"},
 {id:"atlas-evals",name:"atlas-evals",owner:"data-ai",classification:"restricted"},
 {id:"identity-automation",name:"identity-automation",owner:"identity",classification:"restricted"},
 {id:"client-analytics",name:"client-analytics",owner:"client-ops",classification:"restricted"},
 {id:"policy-as-code",name:"policy-as-code",owner:"risk",classification:"internal"}
]);