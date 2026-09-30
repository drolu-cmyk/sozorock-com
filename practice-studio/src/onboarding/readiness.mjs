export function onboardingReadiness({employee,mailbox,calendar,entitlements,lease}){
  const checks=[
    ["employee_identity",Boolean(employee?.employee_id)],
    ["mailbox",mailbox?.status==="active"],
    ["calendar",calendar?.status==="active"],
    ["entitlements",Array.isArray(entitlements?.systems)&&entitlements.systems.length>0],
    ["sandbox_lease",lease?.status==="active"]
  ];
  return Object.freeze({
    ready:checks.every(([,ok])=>ok),
    checks:Object.fromEntries(checks)
  });
}
