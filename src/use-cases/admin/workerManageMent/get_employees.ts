import { MechanicResponesDto } from "../../../DTO/dto";
import { MechanicMap } from "../../../DTO/map/mechanic.map";
import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { IEmployee_admin_Repositories } from "../../../interfaces/repositories/admin/employees/admin_emplRepositories";


export class Admin_get_allEmployees_useCase{
    constructor(
        private emplrepositories:IEmployee_admin_Repositories
    ) {}

    async execute():Promise<MechanicResponesDto[]>{
        const employees=await this.emplrepositories.findAll();
        
        return employees.map((item)=>MechanicMap.toResponse(item))
    }
}