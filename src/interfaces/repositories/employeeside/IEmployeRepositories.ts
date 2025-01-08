import { EmployeeEntities } from "../../../entities/EmployeeEntities";



export interface IEmployeeRepositories{
    findByEmail(email:string):Promise<EmployeeEntities|null>
    save(employee:EmployeeEntities):Promise<EmployeeEntities>
     findById(id:string):Promise<EmployeeEntities|null>
        findByIdAndUpdate(user:EmployeeEntities):Promise<EmployeeEntities|null>

}