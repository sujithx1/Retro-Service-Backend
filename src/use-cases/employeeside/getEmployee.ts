import { EmployeeEntities } from "../../entities/EmployeeEntities";
import { IEmployeeRepositories } from "../../interfaces/repositories/employeeside/IEmployeRepositories";



export class Employee_get_details_useCase{
    constructor(private employeeRep:IEmployeeRepositories){}

    async execute(id:string):Promise<EmployeeEntities>{
        const employee=await this.employeeRep.findById(id)
        if(!employee) throw new Error("No employee")
        return employee

    }
}