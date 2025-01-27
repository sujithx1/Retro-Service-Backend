import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { EmployeeModel } from "../../../frameworks/db/models/EmployeeModel";
import { IEmployeeRepositories } from "./IEmployeRepositories";



export class EmployeeMongoRepositories implements IEmployeeRepositories{
   async findByEmail(email: string): Promise<EmployeeEntities | null> {
        const employee=await EmployeeModel.findOne({email:email})
        if(!employee) return null
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
    async save(employee: EmployeeEntities): Promise<EmployeeEntities> {
        
        const newEmploye=await EmployeeModel.create(employee)
        return new EmployeeEntities(
            newEmploye.id,
            newEmploye.username,
            newEmploye.email,
            newEmploye.phone,
            newEmploye.password,
            newEmploye.skills,
            newEmploye.experience
        )
    }
     async findById(id: string): Promise<EmployeeEntities|null> {
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
    
      async findByIdAndUpdate(emmployee: EmployeeEntities): Promise<EmployeeEntities|null> {
        const employee=await EmployeeModel.findByIdAndUpdate(emmployee.id,{
          username:emmployee.username,
           phone:emmployee.phone,
          profilePic:emmployee.profilePic,
          skills:emmployee.skills,
          experience:emmployee.experience,
          location:emmployee.location,
      
        },{new:true}
      )
      if(!employee) return null
    
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
async findIdAndUpdateRevenue(id: string, revenue: number): Promise<EmployeeEntities | null> {

  const employee = await EmployeeModel.findByIdAndUpdate(
    id,
    { $inc: { revenue: revenue } }, // Increment the revenue field
    { new: true } // Return the updated document
);
  

if(!employee) return null

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


async findByIdAndUpdatePassword(id: string, password: string): Promise<void | null> {

      const employee=await EmployeeModel.findByIdAndUpdate(id,{password:password},{new:true})
        if(!employee)return null
}

}