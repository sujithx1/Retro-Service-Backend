import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { FinduserLocation, Locationuser_types } from "../../../types/user";



export interface IEmployeeRepositories{
    findByEmail(email:string):Promise<EmployeeEntities|null>
    save(employee:EmployeeEntities):Promise<EmployeeEntities>
    setValidate(empId:string):Promise<boolean>
    checkValidate(empId:string):Promise<boolean|null>
     findById(id:string):Promise<EmployeeEntities|null>
     findByIdAndUpdate(employee:EmployeeEntities):Promise<EmployeeEntities|null>
     findAll():Promise<EmployeeEntities[]>
     findIdAndUpdateRevenue(id:string,revenue:number):Promise<EmployeeEntities|null>
     findIdAndDecrementRevenue(id:string,revenue:number):Promise<EmployeeEntities|null>
     findByIdAndUpdatePassword(id:string,password:string):Promise<void|null>
     findByIdAndonDutyupdate(id:string,duty:boolean):Promise<EmployeeEntities|null>
     findByIdAndUpdatelocation(id:string,location:Locationuser_types):Promise<EmployeeEntities|null>
     findempnearestWithOnduty(userLocation:{lat:number,lng:number}):Promise<EmployeeEntities[]>
     findempnearest10km(userLocation:{lat:number,lng:number}):Promise<EmployeeEntities[]>
     


}