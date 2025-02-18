
import { EmployeeEntities } from "../../entities/EmployeeEntities";
import { IEmployeeRepositories } from "../../interfaces/repositories/employeeside/IEmployeRepositories";
import { comparePassword } from "../../utils/hashPassword";


export class Emp_Login_useCase{
    constructor(private employeeRespositories:IEmployeeRepositories,

    ) {}

    async execute(email:string,password:string):Promise<EmployeeEntities>{
        const employee=await this.employeeRespositories.findByEmail(email)
        if(!employee) throw new Error("Email not registerd")
        if(employee.isActive==false)
        throw new Error("Employee is Blocked")
        const compare=await comparePassword(password,employee.password)
        if(!compare) throw  new Error("Password not matched")
            
          

        return  new EmployeeEntities(
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
    employee.onDuty,
    employee.createdAt,
    employee.updatedAt,
    
    )   
    }
}