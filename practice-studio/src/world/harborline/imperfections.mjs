export const HARBORLINE_IMPERFECTIONS=Object.freeze([
 {id:"legacy-groups",area:"identity",fact:"Several older nested access groups remain from pre-2024 reorganizations.",visibility:"discoverable"},
 {id:"contractor-process",area:"people-identity",fact:"Contractor offboarding depends on both HR status and sponsoring-manager closure.",visibility:"discoverable"},
 {id:"cloud-exceptions",area:"cloud-risk",fact:"A small number of legacy cloud roles predate the current access standard.",visibility:"discoverable"},
 {id:"ai-inventory-gap",area:"ai-governance",fact:"AI inventory quality varies across business units.",visibility:"discoverable"},
 {id:"vendor-token-age",area:"application-security",fact:"Some third-party integrations still use long-lived credentials.",visibility:"hidden-until-evidence"},
 {id:"policy-lag",area:"governance",fact:"Written policy occasionally trails engineering practice after rapid changes.",visibility:"discoverable"}
]);