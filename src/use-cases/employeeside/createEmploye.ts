import { EmployeeEntities } from "../../entities/EmployeeEntities";
import { IEmployeeRepositories } from "../../interfaces/repositories/employeeside/IEmployeRepositories";
import { hashpass } from "../../utils/hashPassword";




export  class EmployeeSignup{
    constructor(private employeRepositories:IEmployeeRepositories) {}
    async execute(data:{username:string,email:string,phone:string,password:string,skills:string[],experience:number}):Promise<EmployeeEntities>{

        const {username,email,phone,password,skills,experience}=data
        const hashPassword=await hashpass(password)
        const employee=new EmployeeEntities(
            "",
            username,
            email,
            phone,
            hashPassword,
            skills,
            experience
        )
        const newEmployee=await this.employeRepositories.save(employee)
        return newEmployee

    }
}