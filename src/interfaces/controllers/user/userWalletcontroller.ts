import { NextFunction, Request, Response } from "express";
import { Wallet_getuserIduseCase } from "../../../use-cases/wallet/getbyuserId";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { AdminGetWalletuseCase } from "../../../use-cases/wallet/getByAdminId";

export class UserwalletController{
    constructor(private getuserWallet:Wallet_getuserIduseCase,
        private getadminWallet:AdminGetWalletuseCase
    ) {
        
    }

    async user_getwalletbyuserId_controller(req:Request,res:Response,next:NextFunction){
        try {
            const {id}=req.params
            if(!id)return next(new CustomError("id missing ",401,AppError.ValidationError))
            const wallet=await this.getuserWallet.execute(id)
            return res.status(200).json({
                message:'success',success:true,wallet
            })
             
            
        } catch (error) {
            return next(error)
        }

    }
    async admin_getwalletbyAdminId_controller(req:Request,res:Response,next:NextFunction){
        try {
           
            const wallet=await this.getadminWallet.execute()
            return res.status(200).json({
                message:'success',success:true,wallet
            })
             
            
        } catch (error) {
            return next(error)
        }

    }
}