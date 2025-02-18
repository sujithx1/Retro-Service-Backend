import { IEmployeeRepositories } from "../../interfaces/repositories/employeeside/IEmployeRepositories";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";



export  class Emp_putonDutyuseCase {

    constructor(private employeeRepositories:IEmployeeRepositories) {}

    async execute(id:string,duty:boolean):Promise<boolean>{
        const employee=await this.employeeRepositories.findById(id)
        if(!employee)  throw new CustomError("employee not found",401,AppError.UserNotFound)
        const update=await this.employeeRepositories.findByIdAndonDutyupdate(id,duty)
    if(!update)throw new CustomError("not updated",401,AppError.ServerError)
    return update.onDuty
    }
    
};
