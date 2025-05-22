import { IEmployeeRepositories } from "../../interfaces/repositories/employeeside/IEmployeRepositories";
import { Address_Types } from "../../types/user";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";

export class Emp_putaddLocationuseCase{
    constructor(private employeerepositoreis:IEmployeeRepositories){}

    async execute(id:string,lat:number,lng:number,address:Address_Types){
         const employee= await this.employeerepositoreis.findById(id);
                if(!employee) throw new CustomError("employee not found ",401,AppError.UserNotFound);
                 const update=await this.employeerepositoreis.findByIdAndUpdatelocation(id,{lat,lng,address});
                if(!update?.location) throw new CustomError("not Updated",401,AppError.ServerError);
                return update.location;
        

    }
}