import { MechanicResponesDto } from "../../../DTO/dto";
import { MechanicMap } from "../../../DTO/map/mechanic.map";
import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { IEmployee_admin_Repositories } from "../../../interfaces/repositories/admin/employees/admin_emplRepositories";


export class Admin_put_employee_useCase{
    constructor(private employeeRepositories:IEmployee_admin_Repositories) {
        
    }


    async execute(id:string,username:string,phone:string,skills:string[],experience:number):Promise<MechanicResponesDto>{
        const employe=await this.employeeRepositories.findById(id);
        if(!employe) throw new Error("id not matching ");
            employe.username=username,
        employe.phone=phone,
        
        employe.skills=skills,
        employe.experience=experience;
        
        const update=await this.employeeRepositories.findByIdAndUpdate(employe);
        if(!update) throw new Error("Not updateded");
        return MechanicMap.toResponse(update)
    
    }
    }
