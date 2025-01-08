import { CategoryEntities } from "../../../entities/CategoryEntities";
import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { JobsEntities } from "../../../entities/JobsEntities";
import { UserIntities } from "../../../entities/Userentities";

export interface IAdminRepositories {
  findByemail(email: string): Promise<UserIntities | null>;
  save(user: UserIntities): Promise<UserIntities>;
  findAllUsers():Promise<UserIntities[]>
  findAllEmployees():Promise<EmployeeEntities[]>
  findAllJobs():Promise<JobsEntities[]>
  findAllCategories():Promise<CategoryEntities[]>
  
}
