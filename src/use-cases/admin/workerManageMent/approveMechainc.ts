import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";



export class Approve_MechanicadminuseCase{
     constructor(private mechanicrepositories:IEmployeeRepositories) {
        
     }

     async execute(mechId:string):Promise<void>{

        const mechanic=await this.mechanicrepositories.findById(mechId);
        if(!mechanic)throw new CustomError("Mechanic not found",404,AppError.UserNotFound);
       const update= await this.mechanicrepositories.setValidate(mechId);
    if (!update)  throw new CustomError("Not updated",500,AppError.ServerError);
     

     }
}