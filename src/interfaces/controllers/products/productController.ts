import { NextFunction, Request, Response } from "express";
import { Store_getproductsbystoreId } from "../../../use-cases/store/getproductsbystoreId";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class ProductController{
    constructor(
        private getproductbyStorid:Store_getproductsbystoreId
    ) {
        
    }

    async getProducts_storeId(req:Request,res:Response,next:NextFunction){
        try {
            const {id}=req.params
            if(!id)return next(new CustomError('missing id',401,AppError.ValidationError))
            const products=await this.getproductbyStorid.execute(id)
        console.log(products);
        
            return res.status(200).json({success:true,products})
        } catch (error) {
            return next(error)
            
        }
    }
}