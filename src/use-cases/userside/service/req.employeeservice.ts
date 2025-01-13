import { RequestserviceMechEntities } from "../../../entities/reqserviceEntities";
import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";
import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";
import { FinduserLocation } from "../../../types/user";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export class ReqEmployeeServices_useCase{
    constructor(private userRepositories:IUserRepositories,
        private employeeRepositoires:IEmployeeRepositories,
        private reqServicesRepositories:IreqservicemechanicsRepositories
    ) {}

    async execute(
        userId:string,
        userEmail:string,
        userName:string,
        userLocation:FinduserLocation,
        jobId:string,
        jobName:string,
        Min_wage:number,    
        problem:string,
    ){

            const user=await this.userRepositories.findById(userId)
            if(!user) throw new CustomError("User not found",401,AppError.UserNotFound)
            

            const employees=await this.employeeRepositoires.findAll()
            const emplist=employees.map(emp=> emp.id)
            
            
            const newReqs=new RequestserviceMechEntities(
                "",
                userId,
                userName,
                userEmail,
                userLocation,
                jobId,
                jobName,
                Min_wage,
                problem,
                emplist,
                "PENDING",
                new Date()


            )

            return await this.reqServicesRepositories.create(newReqs)
        

    }
}