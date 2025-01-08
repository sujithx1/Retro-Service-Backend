import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import redisClient from "../../../utils/helper/redis";
import { generate_otp, sendOtp } from "../../../utils/otp";

export class  Forgot_PasswordotpUseCase{
    constructor(private userRepo:IUserRepositories){}

    async execute(email:string){
        
        const user=await this.userRepo.findByemail(email)
        if(!user)  throw new CustomError("user Not Found", 404,AppError.UserNotFound);
            const otp=generate_otp()
            console.log("otp",otp);
            

        await sendOtp(email,user.username,otp)
        await redisClient.setEx("forgot-password-otp", 60, JSON.stringify(otp));

        return true

    }
}