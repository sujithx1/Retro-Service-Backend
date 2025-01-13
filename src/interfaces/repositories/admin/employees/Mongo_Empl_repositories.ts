import { EmployeeEntities } from "../../../../entities/EmployeeEntities";
import { EmployeeModel } from "../../../../frameworks/db/models/EmployeeModel";
import { IEmployee_admin_Repositories } from "./admin_emplRepositories";


export class Mongo_Admin_Employees_Repositories implements IEmployee_admin_Repositories{
  async  findAll(): Promise<EmployeeEntities[]> {
         const employees = await EmployeeModel.find();
            return employees.length?employees.map(
              (item) =>
                new EmployeeEntities(
                  item.id,
                  item.username,
                  item.email,
                  item.phone,
                  item.password,
                  item.skills,
                  item.experience,
                  item.isActive,
                  item.profilePic,
                  item.location,
                  item.authSource,
                  item.role,
                  item.revenue,
                  item.createdAt,
                  item.updatedAt
                )
            ):[]
    }

   async findById(id: string): Promise<EmployeeEntities | null> {
        const employee=await EmployeeModel.findById(id)
        if(!employee)return null
        return new EmployeeEntities(
            employee.id,
            employee.username,
            employee.email,
            employee.phone,
            employee.password,
            employee.skills,
            employee.experience,
            employee.isActive,
            employee.profilePic,
            employee.location,
            employee.authSource,
            employee.role,
            employee.revenue,
            employee.createdAt,
            employee.updatedAt
        )
    }

    async findByIdAndUpdate(employe: EmployeeEntities): Promise<EmployeeEntities|null> {
        const employedata=await EmployeeModel.findByIdAndUpdate(employe.id,{
            username:employe.username,
            phone: employe.phone,
            location:employe.location,
            skill:employe.skills,
            experience:employe.experience,
            profilePic:employe.profilePic,
            isActive:employe.isActive
        },{new:true}
    )

    if(!employedata) return null
    return new EmployeeEntities(
        employedata.id,
        employedata.username,
        employedata.email,
        employedata.phone,
        employedata.password,
        employedata.skills,
        employedata.experience,
        employedata.isActive,
        employedata.profilePic,
        employedata.location,
        employedata.authSource,
        employedata.role,
        employedata.revenue,
        employedata.createdAt,
        employedata.updatedAt
        
    )
    }

} 