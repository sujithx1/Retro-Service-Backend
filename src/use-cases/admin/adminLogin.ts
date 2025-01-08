import { comparePassword } from "../../utils/hashPassword";
import { AdminEntities } from "../../entities/AdminEntities";
import { IAdminRepositories } from "../../interfaces/repositories/admin/Admin_repositories";
import { UserIntities } from "../../entities/Userentities";
import { EmployeeEntities } from "../../entities/EmployeeEntities";
import { JobsEntities } from "../../entities/JobsEntities";
import { CategoryEntities } from "../../entities/CategoryEntities";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";



export class AdminLogin{
    constructor(private adminrepositories:IAdminRepositories,
    
        
    ){}
    async execute(email:string,password:string):Promise<AdminEntities>{

            const admin=await this.adminrepositories.findByemail(email)
            console.log(admin);
            
            if (!admin || !admin.isAdmin) {
              throw new CustomError("Your not Admin",401,AppError.InvalidCredentials)   
            }

            const compare=await comparePassword(password,admin.password)
            if(!compare) throw new CustomError("password not matching",401,AppError.InvalidCredentials)   

            return new AdminEntities(admin.id,admin.username,admin.email,admin.phone,admin.password,admin.isActive,admin.profilePic,admin.isAdmin,admin.authSource,admin.role,admin.createdAt,admin.updatedAt)

    }
    async getAlluser():Promise<UserIntities[]>{
        return await this.adminrepositories.findAllUsers()

    }
    async getAllEmployees():Promise<EmployeeEntities[]>
    {
        return await this.adminrepositories.findAllEmployees()

    }
    async getAllJobs():Promise<JobsEntities[]>{
        return await this.adminrepositories.findAllJobs()

    }
    async getAllCategories():Promise<CategoryEntities[]>{
        return await this.adminrepositories.findAllCategories()
    }
    
  
}