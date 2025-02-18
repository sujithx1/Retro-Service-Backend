import mongoose, { Document, Schema } from "mongoose";
import { IuserTypes } from "./UserModel";

interface  ItransactionHistory extends Document{

    userId:IuserTypes|mongoose.Types.ObjectId;
    type:"purchase"|"refund"|"deposit"|"withdrawal"|"advancepay"|"payment"|"credited";
    amount:number;
    status:"complete"|"pending"|"failed";
    paymentMethod:"razorypay"|"wallet"|"cod"
    serviceType:"service"|"product"|"add",
    createdAt:Date,
    updatedAt:Date
}

const transactionSchema=new Schema<ItransactionHistory>({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    type:{
        type:String,
        enum:["purchase","refund","deposit","withdrawal","advancepay","payment","credited"],
        required:true
    }
    ,
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["complete","pending","failed"],
        default:'pending'
    },
    paymentMethod:{
        type:String,
        enum:["razorypay","wallet","cod"],
        default:'razorypay'
    },
    serviceType:{
        type:String,
        enum:['service','product',"add"],
        required:true
    }

},{
    timestamps:true
})
export const TransactionModel=mongoose.model('Transaction',transactionSchema)