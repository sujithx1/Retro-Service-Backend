import { FinduserLocation } from "../types/user";

interface AcceptEmployee_types{
    employeeId:string|null,
    acceptTime:Date|null

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
        public mechanics:string[],
       public status: "PENDING" | "CONFIRMED" | "CANCELLED"|"COMPLETED"="PENDING",
       public bookingDate:Date,
       public acceptEmployee:AcceptEmployee_types|null=null ,
       public paymentId?:string
   ){}
}