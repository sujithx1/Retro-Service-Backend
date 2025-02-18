import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";

export class User_getNearestEmployees{
    constructor(private employeeRepositories:IEmployeeRepositories) {
        
    }

    async execute(lat:number,lng:number):Promise<EmployeeEntities[]>{

        const employees=await this.employeeRepositories.findempnearest10km({lat,lng})
        
       return employees



        
    }
}