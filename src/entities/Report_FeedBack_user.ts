

export class Report_feedBack_User_Entities{
    constructor(
        public id:string,
        public user:string,        
        public name:string,
        public userEmail:string,
        public employee:string,
        public EmployeeName:string,
        public feedBack:string,
        public employeeEmail:string,
        public rating:number,
        
        public type:string,
        public refaund:boolean=false,
        public amount:number|null=null,
        public bookingId:string,

        public createdAt?:Date,
        public updatedAt?:Date,
        
        
    ) {
        
    }

}