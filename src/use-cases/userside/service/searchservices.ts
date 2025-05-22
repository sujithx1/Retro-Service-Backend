import { JobsEntities } from "../../../entities/JobsEntities";
import { IJobs_adminRepositories } from "../../../interfaces/repositories/admin/jobs/adminJobsRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export class User_serchjobsuseCase{
    constructor(
        private jobsrepositories:IJobs_adminRepositories
    ){}

    async execute(name:string):Promise<JobsEntities[]>{
        const job=await this.jobsrepositories.jobsfindbynameSearch(name);
        if(!job)throw new CustomError("Job not Found",401,AppError.ResourceNotFound);
        return job;
    }
}