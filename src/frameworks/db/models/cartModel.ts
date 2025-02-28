import mongoose, { Date, Document, ObjectId, Schema, Types } from "mongoose";



export interface IcartTypes extends Document{
_id:ObjectId,
userId:ObjectId,
storeId:ObjectId,
productId:ObjectId,
quantity:number,
price:number
createdAt:Date,
updatedAt:Date

}


const cartSchema=new Schema<IcartTypes>({
    storeId:{
        type:Types.ObjectId,
        ref:'Store',
        required:true
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    productId:{
        type:Types.ObjectId,
        ref:'Product',
        required:true
        
    },
    price:{
        type:Number,
       
        required:true
    },
    quantity:{
        type:Number,
       
        required:true
    }
},{
    timestamps:true
})

export const CartModel=mongoose.model('Cart',cartSchema)