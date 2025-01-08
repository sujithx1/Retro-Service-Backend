import { JobsEntities } from "../../../entities/JobsEntities";
import { IJobs_adminRepositories } from "../../../interfaces/repositories/admin/jobs/adminJobsRepositories";

export class Admin_edit_jobs_useCase {
  constructor(private jobRepositories: IJobs_adminRepositories) {}

  async execute(
    name: string,
    description: string,
    minimum_wage: number,
    id: string
    
  ): Promise<JobsEntities | null> {
    const job = await this.jobRepositories.jobsFindbyId(id);
    if (!job) throw new Error("Job id Not matching ");
    job.name = name;
    job.description = description;
    job.minimum_wage = minimum_wage;


    const updatejob = await this.jobRepositories.jobsFindbyIdAndUpdate(job);
    if (!updatejob) throw new Error("job Not Updated");
    return new JobsEntities(
      updatejob.id,
      updatejob.name,
      updatejob.description,
      updatejob.minimum_wage
    );
  }
}
