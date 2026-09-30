export const PRODUCT_IDENTITY=Object.freeze({
  owner:"SozoRock Tech Inc.",
  commercial_name_status:"naming-in-progress",
  working_name:"Practice Studio",
  working_name_usage:"internal-category-descriptor",
  product_category:"persistent enterprise work simulation platform",
  engine_name:"Practice Studio Engine",
  school_relationship:"licensed-tenant",
  education_only:false
});

export function productIdentityForSurface(surface){
  if(surface==="internal") return PRODUCT_IDENTITY;
  return Object.freeze({
    owner:PRODUCT_IDENTITY.owner,
    commercial_name:null,
    category:PRODUCT_IDENTITY.product_category,
    school_relationship:PRODUCT_IDENTITY.school_relationship
  });
}
