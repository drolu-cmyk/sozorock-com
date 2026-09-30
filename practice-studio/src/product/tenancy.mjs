export function createProductTenant({
  tenant_id,
  tenant_name,
  tenant_type,
  licensed_by="SozoRock Tech Inc.",
  deployment_name=null
}){
  if(!tenant_id||!tenant_name||!tenant_type) throw new Error("Incomplete product tenant");
  return Object.freeze({
    tenant_id,tenant_name,tenant_type,licensed_by,deployment_name,
    product_brand_independent:true
  });
}

export const SCHOOL_DEPLOYMENTS=Object.freeze({
  US:{tenant_type:"professional-development-provider",relationship:"licensee"},
  CANADA:{tenant_type:"professional-development-provider",relationship:"licensee"}
});
