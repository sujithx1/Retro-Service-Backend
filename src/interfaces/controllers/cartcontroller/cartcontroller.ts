import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { AddtoCartuseCase } from "../../../use-cases/store/cart/addtoCart";
import { Cart_updateuseCase } from "../../../use-cases/store/cart/updatecart";
import { Cart_getUseriduseCase } from "../../../use-cases/store/cart/getcartbyUserId";
import { Cart_getProductIduseCase } from "../../../use-cases/store/cart/getcartbyProductId";
import { Cart_deleteCartid } from "../../../use-cases/store/cart/deletecart";
import { GetCart_byIduseCase } from "../../../use-cases/store/cart/getbycart";

export class CartController{
    constructor(
        private newCart:AddtoCartuseCase,
        private updatedcart:Cart_updateuseCase,
        private cartbyUserId:Cart_getUseriduseCase,
        private getcartbyProductId:Cart_getProductIduseCase,
        private deletecartuseingId:Cart_deleteCartid,
        private getBIcartId:GetCart_byIduseCase

    ) {
        
    }
    async addToCart(req:Request,res:Response,next:NextFunction){
        try {

            console.log(req.body);
            
            const {storeId,productId,quantity,price,userId}=req.body;
            if(!storeId||!productId||!price||!quantity||!userId)return next(new CustomError("missing field",401,AppError.ValidationError));
const cart=await this.newCart.execute(userId,storeId,productId,quantity,price);
   
            return res.status(201).json({success:true,cart});
            
        } catch (error) {
            return next(error);
        }
    }
    
    
    
    async updateAddtocart(req:Request,res:Response,next:NextFunction){
        try {

            console.log(req.body);
            
            const {id,storeId,productId,quantity,price,userId}=req.body;
            if(!id||!storeId||!productId||!price||!quantity||!userId)return next(new CustomError("missing field",401,AppError.ValidationError));
const cart=await this.updatedcart.execute(id,userId,storeId,productId,quantity,price);
   
            return res.status(200).json({success:true,cart});
            
        } catch (error) {
            return next(error);
        }
    }
    
    
    async getcartbyUserId(req:Request,res:Response,next:NextFunction){
        try {

            const {userId}=req.params;
            if(!userId)return next(new CustomError("missing field",401,AppError.ValidationError));
const cart=await this.cartbyUserId.execute(userId);
            return res.status(200).json({success:true,cart});
            
        } catch (error) {
            return next(error);
        }
    }


    async _getcartbyproductId(req:Request,res:Response,next:NextFunction){
        try {

            console.log(req.body);
            const {productId}=req.params;
            if(!productId)return next(new CustomError("missing field",401,AppError.ValidationError));
const cart=await this.getcartbyProductId.execute(productId);
            return res.status(200).json({success:true,cart});
                
        } catch (error) {
            return next(error);
        }
    }
    async _deletecartId(req:Request,res:Response,next:NextFunction){
        try {

            console.log(req.body);
            const {productId}=req.body;
            const {id}=req.params;
            if(!id)return next(new CustomError("missing id",401,AppError.ValidationError));
            if(!productId)return next(new CustomError("missing productId",401,AppError.ValidationError));
const cart=await this.deletecartuseingId.execute(id,productId);
            return res.status(200).json({success:true,cart});
            
        } catch (error) {
            return next(error);
        }
    }
    async _getBycartId(req:Request,res:Response,next:NextFunction){
        try {

            
            const {id}=req.params;
            if(!id)return next(new CustomError("missing id",401,AppError.ValidationError));
const cart=await this.getBIcartId.execute(id);
   
            return res.status(200).json({success:true,cart});
            
        } catch (error) {
            return next(error);
        }
    }
    


   
}