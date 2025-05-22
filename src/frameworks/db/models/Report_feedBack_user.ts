import mongoose, {  Schema } from "mongoose";
import { IuserTypes } from "./UserModel";
import { IEmployee_types } from "./EmployeeModel";



export interface IReport_FeedBack_user_Types extends Document {
    _id: Schema.Types.ObjectId;
    rating:number,
    feedBack:string;
    type:string;
    user:IuserTypes;
    employee:IEmployee_types;
    refundProcessed:boolean;
    amount:number;
    bookingId:string;
    createdAt:Date,
    updatedAt:Date
  
  
   
  }

const Report_FeedBack_user_Schema=new Schema<IReport_FeedBack_user_Types>({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    type:{
        type:String,
        enum:["report","feedback"]
        ,required:true
    },
    rating:{
        type:Number,
        required:true
    },
    
    feedBack:{
        type:String,
        required:true

    }
    ,employee:{
        type:mongoose.Schema.ObjectId,
        ref:"employee"
    },
    refundProcessed: {
        type: Boolean, // ✅ New field to track refunds
        default: false,
      },
    amount: {
        type: Number, // ✅ New field to track refunds
        default: null,
      },
    bookingId: {
        type: String, // ✅ New field to track refunds
        required:true ,
      },



},{
    timestamps:true
});

export const Report_FeedBack_user_Model=mongoose.model("Report_FeedBack",Report_FeedBack_user_Schema);

