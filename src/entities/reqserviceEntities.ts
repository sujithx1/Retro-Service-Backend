import { IEmployee_types } from "../frameworks/db/models/EmployeeModel";
import { FinduserLocation } from "../types/user";

interface AcceptEmployee_types{
    employeeId:string|null,
    acceptTime:Date|null

}
export interface ReqService_MechanicTypes{
  employeeId:string|IEmployee_types;
  bookingDate:Date
  // status:"PENDING" | "ACCEPTED" | "CANCELLED"|"REJECTED"
}


export class RequestserviceMechEntities{
    constructor(

      public id:string,
        public userId: string,
        public userName: string,
       public  userEmail: string,
       public userLocation: FinduserLocation,
      public  jobId:string,
       public jobName: string,
       public minWage: number,
        public problem: string,
        public mechanics:ReqService_MechanicTypes[],
       public status: "PENDING" | "CONFIRMED" | "CANCELLED"|"COMPLETED"|"REJECT"|"ACCEPTED" ="PENDING",
       public bookingDate:Date,
       public acceptEmployee:AcceptEmployee_types|null=null ,
       public paymentId?:string
   ){

    // this.mechanics = mechanics.map(mechanic => ({
    //   ...mechanic,
    //   status: mechanic.status || "PENDING", // ✅ Default value
    // }));
    
   }
}