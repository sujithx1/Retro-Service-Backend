import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";



export class Employee_put_job_useCase{
    constructor(private empRep:IEmployeeRepositories){}

    async execute(id:string,jobName:string):Promise<EmployeeEntities>{
        console.log("job name",jobName);
        
        const employe=await this.empRep.findById(id)
        if (!employe) {
            throw new Error("Employee id not matching ");
            }
             employe.skills.push(jobName)

        

        const update=await this.empRep.findByIdAndUpdate(employe)
        if(!update) throw new Error("Not updated");
        return update
        
    }
}