import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";
import { sendOtp } from "../../../utils/otp";


export class SendOtp{
    constructor(private userRepositores:IUserRepositories){}
 

    async exicute(email:string,username:string,otp:number):Promise<void>
    {
        console.log(email);
            
        const existUser=await this.userRepositores.findByemail(email);

        if(existUser) {
            console.log("user alreadu exist");
            
            throw new Error("User Already Exist");}

        
        const sendotpmail=await sendOtp(email,username,otp);
        console.log(sendotpmail);


        
        
        

    }
}