import { JobsEntities } from "../../../../entities/JobsEntities";

export interface IJobs_adminRepositories {
  findAll():Promise<JobsEntities[]>
  jobsCreate(jobs: JobsEntities): Promise<JobsEntities>;
  jobsFindbyName(name: string): Promise<JobsEntities | null>;
  jobsFindbyId(id: string): Promise<JobsEntities | null>;
  jobsFindbyIdAndUpdate(jobs: JobsEntities): Promise<JobsEntities | null>;
  jobsfindbynameSearch(name:string):Promise<JobsEntities[]|null>
  
}
