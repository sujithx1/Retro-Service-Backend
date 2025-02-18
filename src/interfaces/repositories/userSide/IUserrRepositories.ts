import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { UserIntities } from "../../../entities/Userentities";
import { FinduserLocation, Location, Locationuser_types } from "../../../types/user";



export interface IUserRepositories{
    findByemail(email:string):Promise<UserIntities|null>
    save(user:UserIntities):Promise<UserIntities>
    findById(id:string):Promise<UserIntities|null>
    findByIdAndUpdate(user:UserIntities):Promise<UserIntities|null>
    findByIdAndUpdatePassword(id:string,password:string):Promise<void|null>
    findByIdAndUpdatelocation(id:string,location:Locationuser_types):Promise<UserIntities|null>
    findEmployees():Promise<EmployeeEntities[]>
}