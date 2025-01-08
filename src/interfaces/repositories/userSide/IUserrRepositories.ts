import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { UserIntities } from "../../../entities/Userentities";



export interface IUserRepositories{
    findByemail(email:string):Promise<UserIntities|null>
    save(user:UserIntities):Promise<UserIntities>
    findById(id:string):Promise<UserIntities|null>
    findByIdAndUpdate(user:UserIntities):Promise<UserIntities|null>
    findByIdAndUpdatePassword(id:string,password:string):Promise<void|null>
    findEmployees():Promise<EmployeeEntities[]>
}