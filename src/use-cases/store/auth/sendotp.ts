import { StoreEntities } from "../../../entities/StoreEntities";
import { WalletEntities } from "../../../entities/walletEntities";
import { IstoreRepositories } from "../../../interfaces/repositories/store/Istorerepositories";
import { IwalletRepositories } from "../../../interfaces/repositories/wallet/Iwalletrepositories";
import { hashpass } from "../../../utils/hashPassword";
import { generateStoreID } from "../../../utils/helper/generateStoreId";
import redisClient from "../../../utils/helper/redis";
import {  sendOtp } from "../../../utils/otp";


export class SendOtp{
    constructor(
        private storeRepositories:IstoreRepositories,
        private walletrepositories:IwalletRepositories


    ){}
 
    async execute(
       
        username: string,
        otp: number,
        storeDetails: { 
            name: string; 
            owner_email: string; 
            owner_name: string; 
            owner_phone: string; 
            password: string; 
        } //
    ): Promise<StoreEntities| void> {
        console.log(storeDetails.owner_email);
    
        const storeOwner = await this.storeRepositories.findByowner_email(storeDetails.owner_email);
    
        if (storeOwner) {
            console.log("User already exists");


        
            const storeId=await generateStoreID(storeDetails.name)
            const hashPassword=await hashpass(storeDetails.password)
            
            const newstore=new StoreEntities(
                "",
                storeDetails.name,
                storeDetails.owner_name,
                storeDetails.owner_email,
                storeDetails.owner_phone,
                true,
               hashPassword,
                storeId)

           const store= await this.storeRepositories.create(newstore)
            await sendOtp(storeDetails.owner_email, username, storeId,true);

            const wallet=new WalletEntities(
                    "",
                    store.id,
                    "store",
                    0,
                
                    
                )
                    
                this.walletrepositories.create(wallet)
                    

            return store

               }
    
        try {
            const sendOtpMail = await sendOtp(storeDetails.owner_email, username,otp);
            const storeData=new StoreEntities(
                "",
                storeDetails.name,
                storeDetails.owner_name,
                storeDetails.owner_email,
                storeDetails.owner_phone,
                true,
                storeDetails.password,
                ""
            
            )
          await redisClient.setEx("storeotp", 60, JSON.stringify(otp));
          
          await redisClient.setEx("storeData", 60, JSON.stringify(storeData));
    
            console.log(sendOtpMail);
        } catch (error) {
            console.error("Error sending OTP:", error);
            throw new Error("Failed to send OTP");
        }
    }
    
}