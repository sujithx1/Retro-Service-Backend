import { IEmployeeRepositories } from "../../interfaces/repositories/employeeside/IEmployeRepositories";
import { sendOtp } from "../../utils/otp";


export class EmployeeSendOtp{
    constructor(private EmployeeRepositories:IEmployeeRepositories) {}

    async execute(email:string,username:string,otp:number):Promise<void>{
        const existEmp=await this.EmployeeRepositories.findByEmail(email)

        if(existEmp) {
            console.log("user alreadu exist");
            
          throw new Error("User Already Exist")
          
        }

        
        const sendotpmail=await sendOtp(email,username,otp)
        console.log(sendotpmail);

    }
}