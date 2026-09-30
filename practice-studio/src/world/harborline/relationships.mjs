export const HARBORLINE_CLIENTS=Object.freeze([
 {client_id:"northstar-mutual",name:"Northstar Mutual Services",sector:"insurance-services",fictional:true,relationship:"managed analytics and operations",data_classification:"restricted"},
 {client_id:"civicridge",name:"CivicRidge Administration",sector:"public-services-contractor",fictional:true,relationship:"workflow and reporting services",data_classification:"confidential"},
 {client_id:"lumenfield",name:"Lumenfield Commerce Group",sector:"business-services",fictional:true,relationship:"client operations technology",data_classification:"internal-client"}
]);

export const HARBORLINE_VENDORS=Object.freeze([
 {vendor_id:"vector-search-vendor",name:"VectorLake",fictional:true,purpose:"managed vector search used by Atlas",risk_tier:"high",owner:"data-ai"},
 {vendor_id:"case-platform",name:"CaseBridge",fictional:true,purpose:"client operations case workflow",risk_tier:"high",owner:"client-ops"},
 {vendor_id:"notification-provider",name:"SignalPost",fictional:true,purpose:"transactional notifications",risk_tier:"medium",owner:"app-eng"}
]);