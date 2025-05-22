import { JobsEntities } from "../../../entities/JobsEntities";
import { IJobs_adminRepositories } from "../../../interfaces/repositories/admin/jobs/adminJobsRepositories";


export class Admin_del_job_useCase{
    constructor(private jobrepositories:IJobs_adminRepositories) {}
    async execute(id:string):Promise<JobsEntities>{
        const job=await this.jobrepositories.jobsFindbyId(id);
        if(!job)throw new Error("Id Not Matching");
        job.isBlock=!job.isBlock;
    const update=await this.jobrepositories.jobsFindbyIdAndUpdate(job);
    if(!update)throw new Error("not Updated");
        return new JobsEntities(
            update.id,
            update.name,
            update.description,
            update.minimum_wage,
            update.isBlock
        );
    }
}