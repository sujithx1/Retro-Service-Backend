import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { Get_chatbyEmployeeId } from "../../../use-cases/chat/getchatbyEmployeeid";


export class EmployeeChatcontroller{
    constructor(private getchatsEmployeeSide:Get_chatbyEmployeeId) {
        
    }


    async getemployeeChat_employeeid(req:Request,res:Response,next:NextFunction){
    try {
        const {id}=req.params
        if(!id)return next(new CustomError("missing id",401,AppError.ValidationError))
        const chats=await this.getchatsEmployeeSide.execute(id)
    

        return res.status(200).json({message:"success",success:true,chats})

    } catch (error) {
        return next(error)
        
    }

    }
}