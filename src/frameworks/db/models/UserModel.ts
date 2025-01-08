import mongoose, { Document, Schema } from "mongoose";


export interface IuserTypes extends Document{
  _id:Schema.Types.ObjectId,
  username:string,
  email:string,
  phone:string,
  isActive:boolean,
  password:string,
  profilePic:string,
  isAdmin:boolean
  authSource:"self"|"google",
  role:"user"|"admin",
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
  }
},
  {
    timestamps: true,
  }
);
 export const UserModel=mongoose.model('User',userSchema)