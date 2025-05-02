import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { IEmployee_admin_Repositories } from "../../../interfaces/repositories/admin/employees/admin_emplRepositories";


export class Admin_put_employee_useCase{
    constructor(private employeeRepositories:IEmployee_admin_Repositories) {
        
    }


    async execute(id:string,username:string,phone:string,skills:string[],experience:number):Promise<EmployeeEntities>{
        const employe=await this.employeeRepositories.findById(id)
        if(!employe) throw new Error("id not matching ")
            employe.username=username,
        employe.phone=phone,
        
        employe.skills=skills,
        employe.experience=experience
        
        const update=await this.employeeRepositories.findByIdAndUpdate(employe)
        if(!update) throw new Error("Not updateded")
        return new EmployeeEntities(
                update.id,
                update.username,
                update.email,
                update.phone,
                update.password,
                update.skills,
                update.experience,
                update.isValidated,
                update.proof,
                update.isActive,
                update.profilePic,
                update.location,
                update.authSource,
                update.role,
                update.revenue,
                update.onDuty,
                update.FCM_token,
                update.createdAt,
                update.updatedAt
                
            )
        }
    }
