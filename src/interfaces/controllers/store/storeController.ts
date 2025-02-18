import { NextFunction, Request, Response } from "express";
import redisClient from "../../../utils/helper/redis";
import { StoreSignupValidation } from "../../../utils/helper/Validation";
import { generate_otp } from "../../../utils/otp";
import { SendOtp } from "../../../use-cases/store/sendotp";



export class StoreController{
    constructor(
        private sendMails:SendOtp
    ){}

    async signUp(req: Request, res: Response,next:NextFunction) {
        try {
          const { name, owner_email, owner_name, password ,owner_phone} = req.body; 
     
          const userData = { name, owner_email, owner_name,owner_phone, password };
    
          StoreSignupValidation({ name, owner_email, owner_phone,owner_name, password, });
          const otp = generate_otp();

          console.log("otp", otp);
    
         const storeOwner= await this.sendMails.execute(owner_email, name, otp,userData);
        
    
          res.status(200).json({ message: "Enter Otp check your Email" ,storeOwner});
        } catch (error: any) {
          console.log("errpr", error.message);
    
          res.status(400).json({ error: error.message });
        }
      }
}