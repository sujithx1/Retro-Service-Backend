import { ServiceEntities } from "../../../entities/ServiceEntities";
import { IJobs_adminRepositories } from "../../../interfaces/repositories/admin/jobs/adminJobsRepositories";
import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";
import { Iservice_bookingRepositories } from "../../../interfaces/repositories/servicebooking/serviceBooking";
import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";

export class User_Post_Service_booking_useCase{
    constructor(
        private serviceRep:Iservice_bookingRepositories,
        private userRep:IUserRepositories,
        private jobRep:IJobs_adminRepositories,
        private EmpRep:IEmployeeRepositories
    ) {
        
    }

    async execute( 
        userId:string,
        EmpId:string,
        jobId:string,
        userLocation:string,
        ServiceMin_wage:number,
        problem:string,
    ){

            

            const user= await this.userRep.findById(userId);
            if(!user) throw new Error("User Id  Not Valid");
            const employee= await this.EmpRep.findById(EmpId);
            if(!employee) throw new Error("Employee Id  Not Valid");
            const job= await this.jobRep.jobsFindbyId(jobId);
            if(!job) throw new Error("job Not Valid");
                                
            console.log("all ok");
            
               
            

            const serviceData=new ServiceEntities("",user.id,employee.id,job.id,userLocation,"PENDING",new Date(),ServiceMin_wage,problem);
            console.log(serviceData);
            
            const service=await this.serviceRep.create(serviceData); 
            return service;  


            
        
    }
}