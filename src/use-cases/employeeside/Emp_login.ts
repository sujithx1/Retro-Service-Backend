
import { MechanicResponesDto } from "../../DTO/dto";
import { MechanicMap } from "../../DTO/map/mechanic.map";
import { EmployeeEntities } from "../../entities/EmployeeEntities";
import { IEmployeeRepositories } from "../../interfaces/repositories/employeeside/IEmployeRepositories";
import { comparePassword } from "../../utils/hashPassword";


export class Emp_Login_useCase{
    constructor(private employeeRespositories:IEmployeeRepositories,

    ) {}

    async execute(email:string,password:string):Promise<MechanicResponesDto>{
        const employee=await this.employeeRespositories.findByEmail(email);
        if(!employee) throw new Error("Email not registerd");
        if(employee.isValidated===false)throw new Error("Employee is not Verified");
        if(employee.isActive==false)
        throw new Error("Employee is Blocked");
        const compare=await comparePassword(password,employee.password);
        if(!compare) throw  new Error("Password not matched");
            
          

        return  MechanicMap.toResponse(employee)
    }
}