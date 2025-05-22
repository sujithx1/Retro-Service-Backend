import { MechanicResponesDto } from "../../../DTO/dto";
import { MechanicMap } from "../../../DTO/map/mechanic.map";
import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";


export class Employee_put_Profile_useCase{
    constructor(private employeeRep:IEmployeeRepositories) {
        
    }

    async execute(id:string,username:string,phone:string,profilePic:string,experience:number):Promise<MechanicResponesDto>{

        const employe=await this.employeeRep.findById(id);
        if(!employe)throw new Error("no employee found");

     
        employe.username=username;
        employe.phone=phone;
        employe.profilePic=profilePic;

          
        employe.experience=experience;

        const update=await this.employeeRep.findByIdAndUpdate(employe);
        if(!update) throw new Error("employee not updated");
        
        return MechanicMap.toResponse(update);
    }
}
 