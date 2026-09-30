import { AwsIamAdapter } from "./aws-iam.mjs";

export class AwsIamSandboxAdapter extends AwsIamAdapter {
  constructor({client,config}){ super(client); this.config=config; }

  async provision(employee,role){
    if(!this.config?.account_id || !this.config?.role_arn) throw new Error("AWS sandbox not configured");
    return Object.freeze({
      provider:"aws",
      employee_id:employee.employee_id,
      role,
      account_id:this.config.account_id,
      region:this.config.region,
      role_arn:this.config.role_arn,
      max_session_minutes:this.config.max_session_minutes,
      mode:"isolated-sandbox",
      mutations_enabled:Boolean(this.config.allow_mutations)
    });
  }

  async execute(action){
    if(action?.mutation && !this.config.allow_mutations) throw new Error("AWS sandbox mutations disabled");
    return super.execute(action);
  }
}
