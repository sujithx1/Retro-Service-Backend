import { EmployeeEntities } from "../../../entities/EmployeeEntities";



export interface IEmployeeRepositories{
    findByEmail(email:string):Promise<EmployeeEntities|null>
    save(employee:EmployeeEntities):Promise<EmployeeEntities>
     findById(id:string):Promise<EmployeeEntities|null>
     findByIdAndUpdate(employee:EmployeeEntities):Promise<EmployeeEntities|null>
     findAll():Promise<EmployeeEntities[]>
     findIdAndUpdateRevenue(id:string,revenue:number):Promise<EmployeeEntities|null>

}