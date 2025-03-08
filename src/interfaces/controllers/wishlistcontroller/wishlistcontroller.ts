import { NextFunction, Request, Response } from "express";
import { CreateWishlistuseCase } from "../../../use-cases/wishlist/create.usecase";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { User_getwishlistsbyUserId } from "../../../use-cases/wishlist/getwishlistsuser";
import { User_deletewishlistuseCase } from "../../../use-cases/wishlist/deletewishlistByid";


export class WishlistController{
    constructor(
        private postwishlist:CreateWishlistuseCase,
        private getwishlist_byuserId:User_getwishlistsbyUserId,
        private deletewishlist:User_deletewishlistuseCase,
    ) {
        
    }

    async _postcreateWislist(req:Request,res:Response,next:NextFunction){
        try {
            const {productId,userId}=req.body
            console.log(req.body)
            
            if (!productId||!userId) {
                return next(new CustomError("missing field",400,AppError.ValidationError))
                
            }


            const wishlist=await this.postwishlist.execute(productId,userId)
            return res.status(201).json({success:true,wishlist})
        } catch (error) {
            return next(error)
        }

    }
    async _getwishlistsbyUserId(req:Request,res:Response,next:NextFunction){
        try {
            // const {productId,userId}=req.body
            const {id}=req.params
            
            if (!id) {
                return next(new CustomError("missing userId",400,AppError.ValidationError))
                
            }


            const wishlists=await this.getwishlist_byuserId.execute(id)
            return res.status(200).json({success:true,wishlists})
        } catch (error) {
            return next(error)
        }

    }
    async _deletewishlistsbyId(req:Request,res:Response,next:NextFunction){
        try {
            // const {productId,userId}=req.body
            const {id}=req.params
            
            if (!id) {
                return next(new CustomError("missing id",400,AppError.ValidationError))
                
            }


            const wishlist=await this.deletewishlist.execute(id)
            return res.status(200).json({success:true,wishlist})
        } catch (error) {
            return next(error)
        }

    }
}