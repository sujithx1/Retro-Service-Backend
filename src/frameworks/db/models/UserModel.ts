import mongoose, { Document, Schema } from "mongoose";
import { Address_Types, Locationuser_types } from "../../../types/user";

const AddressSchema = new Schema<Address_Types>({
  country: { type: String, required: true },
  county: { type: String, required: false },
  neighbourhood: { type: String, required: false },
  postcode: { type: String, required: false },
  road: { type: String, required: false },
  state: { type: String, required: true },
  state_district: { type: String, required: false },
  suburb: { type: String, required: false },
  town: { type: String, required: false },
});

// Location Schema
export const LocationSchema = new Schema<Locationuser_types>({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  address: { type: AddressSchema, required: true },
});



export interface IuserTypes extends Document{
  _id:Schema.Types.ObjectId,
  username:string,
  email:string,
  phone:string,
  isActive:boolean,
  password:string,
  profilePic:string,
  isAdmin:boolean,
  authSource:"self"|"google",
  role:"user"|"admin",
  location:Locationuser_types,
  createdAt:Date,
  updatedAt:Date,

}

const userSchema = new Schema<IuserTypes>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique:true,
      required: true,
    },
    phone: {
      type: String,
      default:"",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      default:""
    },
    profilePic: {
      type: String,
      default:""
    },
  isAdmin:{
    type:Boolean,
    default:false
  },
  authSource: {
    type: String, 
    enum: ["self", "google"], 
    default: "self",
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:"user"  
  },
  location:{
    type:LocationSchema ,
    required:false
  
  }
},
  {
    timestamps: true,
  }
);
 export const UserModel=mongoose.model('User',userSchema)