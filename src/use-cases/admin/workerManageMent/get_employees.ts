import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { IEmployee_admin_Repositories } from "../../../interfaces/repositories/admin/employees/admin_emplRepositories";


export class Admin_get_allEmployees_useCase{
    constructor(
        private emplrepositories:IEmployee_admin_Repositories
    ) {}

    async execute():Promise<EmployeeEntities[]>{
        
        return this.emplrepositories.findAll()
    }
}