import { NextFunction, Request, Response } from "express";
import { Store_getproductsbystoreId } from "../../../use-cases/store/getproductsbystoreId";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { ProductgetbyIduseCase } from "../../../use-cases/store/product/getproductbyid";


export class ProductController{
    constructor(
        private getproductbyStorid:Store_getproductsbystoreId,
        private getproductByid:ProductgetbyIduseCase,
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
    async _getProduct_Id(req:Request,res:Response,next:NextFunction){
        try {
            const {id}=req.params
            if(!id)return next(new CustomError('missing id',401,AppError.ValidationError))
            const product=await this.getproductByid.execute(id)
        console.log(product);
        
            return res.status(200).json({success:true,product})
        } catch (error) {
            return next(error)
            
        }
    }
}