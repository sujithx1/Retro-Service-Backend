import { JobsEntities } from "../../../entities/JobsEntities";
import { IJobs_adminRepositories } from "../../../interfaces/repositories/admin/jobs/adminJobsRepositories";

export class Admin_get_jobs_useCase{
    constructor(private jobRepositories:IJobs_adminRepositories) {
        
    }
    async execute():Promise<JobsEntities[]>{
        return await this.jobRepositories.findAll();
    }
}