import mongoose, { Document, Schema } from "mongoose";
import { Address_Types, FinduserLocation, Locationuser_types } from "../../../types/user";



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
const LocationSchema = new Schema<Locationuser_types>({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  address: { type: AddressSchema, required: true },
});

export interface IEmployee_types extends Document{
  _id:Schema.Types.ObjectId,
  username:string,
  email:string,
  phone:string,
  isActive:boolean,
  onDuty:boolean,
  password:string,              
  profilePic?:string,
  experience:number,
  skills:string[],
  location?:Locationuser_types
  authSource:"self"|"google",
  role:string,
  revenue:number,
  proof:string;
  isValidated:boolean, 
  createdAt:Date,
  updatedAt:Date,

}
const EmployeSchema=new Schema<IEmployee_types>({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,

    },
    isActive:{
        type:Boolean,
        default:true
    },
    password:{
        type:String,
        required:true

    },
    skills:{
        type:[String],
        unique:true,
    },
    
    experience:{
        type:Number,
        required:true
    },
    profilePic:{
        type:String,
        default:""

    },
    location:{
      type:LocationSchema,
       required:false
        },
    authSource:{
        type:String,
        enum:["self","google"],
        default:'self'
    },
    role:{
        type:String,
        default:"employee"
    },
    revenue:{
        type:Number,
        default:0
    },
    onDuty:{
        type:Boolean,
        default:false
 },
 proof:{
    type:String,
    required:true
 },
 isValidated:{
    type:Boolean,
    default:false
 }


},

{
    timestamps:true

})


export const EmployeeModel=mongoose.model('employee',EmployeSchema)