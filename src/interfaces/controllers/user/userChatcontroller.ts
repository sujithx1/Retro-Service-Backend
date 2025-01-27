import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
// import { Get_MessagesByuseId } from "../../../use-cases/chat/getChatsbyuserId";


export class UserChatcontroller{
    constructor(
        // private getmessgesByuserSide:Get_MessagesByuseId
    ) {}


    // async user_getChats(req:Request,res:Response,next:NextFunction){
    //     try {
    //             const {id}=req.params
    //             if(!id)return next(new CustomError("id not found",401,AppError.ValidationError))

    //             const messages=await this.getmessgesByuserSide.execute(id)
    //             return res.status(200).json({message:"success",success:true,messages})
        
                    


    //     } catch (error) {
    //        return next(error)
            
    //     }
    // }



}