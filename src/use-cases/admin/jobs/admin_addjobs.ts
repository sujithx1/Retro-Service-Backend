import { JobsEntities } from "../../../entities/JobsEntities";
import { IJobs_adminRepositories } from "../../../interfaces/repositories/admin/jobs/adminJobsRepositories";

export class Admin_add_jobs_useCase {
  constructor(private JobRepositories: IJobs_adminRepositories) {}

  async execute(
    name: string,
    description: string,
    minimum_wage: number
  ): Promise<JobsEntities> {
    const existingJob = await this.JobRepositories.jobsFindbyName(name);
    if (existingJob) throw new Error("job Alredy exist");
    const job = new JobsEntities("", name, description, minimum_wage);

    return await this.JobRepositories.jobsCreate(job);
  }
}
