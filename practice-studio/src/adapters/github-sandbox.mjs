import { GitHubAdapter } from "./github.mjs";

export class GitHubSandboxAdapter extends GitHubAdapter {
  constructor({client,config}){ super(client); this.config=config; }

  async provision(employee,role){
    if(!this.config?.organization) throw new Error("GitHub sandbox organization not configured");
    return Object.freeze({
      provider:"github",
      employee_id:employee.employee_id,
      role,
      organization:this.config.organization,
      repository_prefix:this.config.repository_prefix,
      mode:"sandbox",
      mutations_enabled:Boolean(this.config.allow_mutations)
    });
  }

  async execute(action){
    if(action?.mutation && !this.config.allow_mutations) throw new Error("GitHub sandbox mutations disabled");
    return super.execute(action);
  }
}
