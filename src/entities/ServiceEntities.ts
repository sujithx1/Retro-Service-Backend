
export class ServiceEntities{
    constructor(
        public id:string,

        public userId:string,
        public employeeId:string,
        public jobId:string,
        public userLocation:string,
        public status:"PENDING"| "CONFIRMED"| "CANCELLED" |"COMPLETED"="PENDING",
        public bookingDate:Date,
        public service_Minwage:number,
        public problem:string,
        public userName?:string,
        public employeeName?:string,
        public JobName?:string,
        public userProfilePic?:string,
        public employeeLocation?:string, 
        public userPhone?:string,   
        public createdAt?:Date,
        public updatedAt?:Date
    ) {
        
    }
}