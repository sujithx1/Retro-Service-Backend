import { EmployeeEntities } from "../../../../entities/EmployeeEntities";


export interface IEmployee_admin_Repositories{
    findAll():Promise<EmployeeEntities[]>
    findById(id:string):Promise<EmployeeEntities| null>
    findByIdAndUpdate(employe:EmployeeEntities):Promise<EmployeeEntities|null>
}