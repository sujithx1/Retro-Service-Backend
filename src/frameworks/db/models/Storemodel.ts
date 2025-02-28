import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { Locationuser_types } from "../../../types/user";
import { LocationSchema } from "./UserModel";

export interface IStore_types extends Document{
    _id:ObjectId,
    name:string;
    location:Locationuser_types,
    storeId:string,
    owner_name:string,
    owner_email:string,
    owner_phone:string,
    password:string,
    isActive:boolean,
    revenue:number;
    profile_pic:string;
    createdAt:Date,
    updatedAt:Date,
    
}

const storeSchema=new Schema<IStore_types>({
    name:{
        type:String,
        required:true
    },
    storeId:{
        type:String,
        default:""
    }
    
    ,
    owner_name:{
        type:String,
        required:true
    },
    owner_email:{
        type:String,
        required:true
    },
    owner_phone:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true

    },
    location:{
        type:LocationSchema,
        required:false


    },
    password:{
        type:String,
        required:false
    },
    revenue:{
        type:Number,
        default:0
    }
,profile_pic:{
    type:String,
    default:'https://example.com/default-profile-pic.png'
}
    
},{
    timestamps:true
})

export const StoreModel=mongoose.model('Store',storeSchema)