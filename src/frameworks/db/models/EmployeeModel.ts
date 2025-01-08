import mongoose, { Document, Schema } from "mongoose";



export interface IEmployee_types extends Document{
  _id:Schema.Types.ObjectId,
  username:string,
  email:string,
  phone:string,
  isActive:boolean,
  password:string,              
  profilePic?:string,
  experience:number,
  skills:string[],
  location?:string
  authSource:"self"|"google",
  role:string,
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
        type:String,
        default:""
    },
    authSource:{
        type:String,
        enum:["self","google"],
        default:'self'
    },
    role:{
        type:String,
        default:"employee"
    }


    
},

{
    timestamps:true

})


export const EmployeeModel=mongoose.model('employee',EmployeSchema)