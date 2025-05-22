import { MechanicResponesDto } from "../../DTO/dto";
import { MechanicMap } from "../../DTO/map/mechanic.map";
import { EmployeeEntities } from "../../entities/EmployeeEntities";
import { IEmployeeRepositories } from "../../interfaces/repositories/employeeside/IEmployeRepositories";



export class Employee_get_details_useCase{
    constructor(private employeeRep:IEmployeeRepositories){}

    async execute(id:string):Promise<MechanicResponesDto>{
        const employee=await this.employeeRep.findById(id);
        if(!employee) throw new Error("No employee");
        return MechanicMap.toResponse(employee);

    }
}