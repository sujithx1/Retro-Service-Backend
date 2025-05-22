import { IEmployeeRepositories } from "../../interfaces/repositories/employeeside/IEmployeRepositories";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";
import redisClient from "../../utils/helper/redis";
import { generate_otp, sendOtp } from "../../utils/otp";

export class  Emp_Forgot_PasswordotpUseCase{
    constructor(private userRepo:IEmployeeRepositories){}

    async execute(email:string){
        
        const user=await this.userRepo.findByEmail(email);
        if(!user)  throw new CustomError("user Not Found", 404,AppError.UserNotFound);
            const otp=generate_otp();
            console.log("otp",otp);
            

        await sendOtp(email,user.username,otp);
        await redisClient.setEx("forgot-password-otp", 60, JSON.stringify(otp));

        return true;

    }
}