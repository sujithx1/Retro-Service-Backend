import { StoreEntities } from "../../entities/StoreEntities";
import { IstoreRepositories } from "../../interfaces/repositories/store/Istorerepositories";
import redisClient from "../../utils/helper/redis";
import { generate_otp, sendOtp } from "../../utils/otp";


export class SendOtp{
    constructor(
        private storeRepositories:IstoreRepositories


    ){}
 
    async execute(
        email: string,
        username: string,
        otp: number,
        storeDetails: { 
            name: string; 
            owner_email: string; 
            owner_name: string; 
            owner_phone: string; 
            password: string; 
        } // ✅ Default empty values
    ): Promise<number| void> {
        console.log(email);
    
        const storeOwner = await this.storeRepositories.findByowner_email(email);
    
        if (storeOwner) {
            console.log("User already exists");

            const storeId=generate_otp()
            const newstore=new StoreEntities(
                "",
                storeDetails.name,
                storeDetails.owner_name,
                storeDetails.owner_email,
                storeDetails.owner_phone,
                true,
                storeDetails.password,
                storeId)

            await this.storeRepositories.create(newstore)
            return storeId

               }
    
        try {
            const sendOtpMail = await sendOtp(email, username, otp);
            
          await redisClient.setEx("otp", 60, JSON.stringify(otp));
          await redisClient.setEx("userData", 60, JSON.stringify(storeDetails));
    
            console.log(sendOtpMail);
        } catch (error) {
            console.error("Error sending OTP:", error);
            throw new Error("Failed to send OTP");
        }
    }
    
}