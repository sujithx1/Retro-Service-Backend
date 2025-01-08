import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { IEmployee_admin_Repositories } from "../../../interfaces/repositories/admin/employees/admin_emplRepositories";



export class Admin_del_employee_useCase{
    constructor(private employeerepositories:IEmployee_admin_Repositories){}
    
    async execute(id:string):Promise<EmployeeEntities>{
        const employee=await this.employeerepositories.findById(id)
        if(!employee) throw new Error('id is not matching ')
        employee.isActive=!employee.isActive
    
        const update= await this.employeerepositories.findByIdAndUpdate(employee)

        if(!update) throw new Error("not updated")
            console.log(update);
            
        return new EmployeeEntities(
            update.id,
            update.username,
            update.email,
            update.phone,
            update.password,
            update.skills,
            update.experience,
            update.isActive,
            update.profilePic,
            update.location,
            update.authSource,
            update.role,
            update.createdAt,
            update.updatedAt
            
        )

        
    }
}