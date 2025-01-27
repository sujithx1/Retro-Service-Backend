import mongoose, { Document, Schema } from "mongoose";
import { IuserTypes } from "./UserModel";
import { IEmployee_types } from "./EmployeeModel";

export interface IReviewRating_Types extends Document {
    _id: Schema.Types.ObjectId,
    rating:number,
    feedBack:string,
    user:IuserTypes,
    employee:IEmployee_types,
    createdAt:Date,
    updatedAt:Date  
   }


   
   const ReviewRatingSchema=new Schema<IReviewRating_Types>({
       user:{
           type:mongoose.Schema.ObjectId,
           ref:"User"
       },
      
       feedBack:{
           type:String,
           required:true
   
       }
       ,employee:{
           type:mongoose.Schema.ObjectId,
           ref:"employee"
       },
       
   
   
   
   },{
       timestamps:true
   })
   
   export const ReviewRatingModal=mongoose.model('ReviewRating',ReviewRatingSchema)
   