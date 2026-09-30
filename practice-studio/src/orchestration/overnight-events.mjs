export function createOvernightEvents({employee_id,previousDayState}){
  const events=[];

  if(previousDayState?.monitoring_attention){
    events.push({
      scheduled_id:"overnight-monitoring-signal",
      run_at:"2026-10-03T02:17:00-04:00",
      urgent:false,
      event:{
        event_id:"evt-overnight-monitoring",
        occurred_at:"2026-10-03T02:17:00-04:00",
        actor_type:"system",
        actor_id:"security-monitoring",
        source_system:"security-monitoring",
        event_type:"alert.raised",
        context_id:"iam-day3-audit",
        visible_to:[employee_id],
        payload:{signal:"out-of-pattern access during non-business hours",severity:"low"}
      }
    });
  }

  return events;
}
