import mongoose, { Document, ObjectId, Types } from "mongoose";
import { ICategory } from "./Category_Model";
import { IStore_types } from "./Storemodel";
export interface IProduct extends Document {
    _id:ObjectId,
    storeId:IStore_types|mongoose.Types.ObjectId;
    name: string;
    description: string;
    stock: number;
    category: Types.ObjectId | ICategory; // Allow ObjectId or populated ICategory
    price: number;
    images: string[];
    isBlock: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }


const Product_schema=new mongoose.Schema<IProduct>({
    storeId:{
        type:mongoose.Types.ObjectId,
        ref:'Store',
        required:true

    },

    name:{
        type:String,
        required:true

    },description:{
        type:String,
        required:true,
        
    },
    stock:
    {
        type:Number,
        required:true,
        min:0

    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0

    },

    images:{
        type:[String],
        required:true
    }, 
    isBlock:{
        type:Boolean,
        default:false
    },


},{
    timestamps:true

})


export const Product_Model=mongoose.model('Product',Product_schema)
