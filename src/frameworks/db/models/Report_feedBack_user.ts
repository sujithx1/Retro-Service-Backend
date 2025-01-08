import mongoose, {  Schema } from "mongoose";
import { IuserTypes } from "./UserModel";
import { IEmployee_types } from "./EmployeeModel";



export interface IReport_FeedBack_user_Types extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    feedBack:string;
    user:IuserTypes;
    employee:IEmployee_types;
    createdAt:Date,
    updatedAt:Date
  
  
   
  }

const Report_FeedBack_user_Schema=new Schema<IReport_FeedBack_user_Types>({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
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
    



},{
    timestamps:true
})

export const Report_FeedBack_user_Model=mongoose.model('Report_FeedBack',Report_FeedBack_user_Schema)

