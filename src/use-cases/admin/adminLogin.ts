import { comparePassword } from "../../utils/hashPassword";
import { AdminEntities } from "../../entities/AdminEntities";
import { IAdminRepositories } from "../../interfaces/repositories/admin/Admin_repositories";
import { UserIntities } from "../../entities/Userentities";
import { EmployeeEntities } from "../../entities/EmployeeEntities";
import { JobsEntities } from "../../entities/JobsEntities";
import { CategoryEntities } from "../../entities/CategoryEntities";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";
import { MechanicResponesDto, UserResponsDto } from "../../DTO/dto";
import { UserMap } from "../../DTO/map/user.map";
import { MechanicMap } from "../../DTO/map/mechanic.map";



export class AdminLogin{
    constructor(private adminrepositories:IAdminRepositories,
    
        
    ){}
    async execute(email:string,password:string):Promise<UserResponsDto>{

            const admin=await this.adminrepositories.findByemail(email);
            console.log(admin);
            
            if (!admin || !admin.isAdmin) {
              throw new CustomError("Your not Admin",401,AppError.InvalidCredentials);   
            }

            const compare=await comparePassword(password,admin.password);
            if(!compare) throw new CustomError("password not matching",401,AppError.InvalidCredentials);   

            return UserMap.toResponse(admin)

    }
    async getAlluser():Promise<UserResponsDto[]>{

            const users=await this.adminrepositories.findAllUsers();
        return users.map((item)=>UserMap.toResponse(item)) 

    }
    async getAllEmployees():Promise<MechanicResponesDto[]>
    {
       const mechaincs=  await this.adminrepositories.findAllEmployees();
       return mechaincs.map((item)=>MechanicMap.toResponse(item))

    }
    async getAllJobs():Promise<JobsEntities[]>{
        return await this.adminrepositories.findAllJobs();

    }
    async getAllCategories():Promise<CategoryEntities[]>{
        return await this.adminrepositories.findAllCategories();
    }
    
  
}