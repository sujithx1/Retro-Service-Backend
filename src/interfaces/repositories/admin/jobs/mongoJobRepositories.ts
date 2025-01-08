import { JobsEntities } from "../../../../entities/JobsEntities";
import { JobModel } from "../../../../frameworks/db/models/JobsModal";
import { IJobs_adminRepositories } from "./adminJobsRepositories";


export class Mongo_Job_admin_Repositories implements IJobs_adminRepositories{


    async jobsCreate(jobs: JobsEntities): Promise<JobsEntities> {
        const job = await JobModel.create(jobs);
    
        return new JobsEntities(
          job.id,
          job.name,
          job.description,
          job.minimum_wage
        );
      }
      async jobsFindbyId(id: string): Promise<JobsEntities | null> {
        const job = await JobModel.findById(id);
        if (!job) return null;
        return new JobsEntities(
          job.id,
          job.name,
          job.description,
          job.minimum_wage,
          job.isBlock
        );
      }
      async jobsFindbyName(name: string): Promise<JobsEntities | null> {
        const job = await JobModel.findOne({ name });
        if (!job) return null;
        return new JobsEntities(
          job.id,
          job.name,
          job.description,
          job.minimum_wage,
          job.isBlock
        );
      }
      async jobsFindbyIdAndUpdate(
        jobs: JobsEntities
      ): Promise<JobsEntities | null> {
        const job = await JobModel.findByIdAndUpdate(
          jobs.id,
          {
            name: jobs.name,
            description: jobs.description,
            minimum_wage: jobs.minimum_wage,
            isBlock:jobs.isBlock
          },
          { new: true }
        );
        if(!job) return null
    
        
    
        return new JobsEntities(
          job.id,
          job.name,
          job.description,
          job.minimum_wage,
          job.isBlock
        )
      }
     async findAll(): Promise<JobsEntities[]> {
          const jobs=await JobModel.find()
          console.log(jobs);
          
          return jobs.map((item)=>new JobsEntities(item.id,item.name,item.description,item.minimum_wage,item.isBlock,item.image))
      }
      
      
    
}