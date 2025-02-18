import mongoose, { Document, Schema } from "mongoose";
import { IEmployee_types } from "./EmployeeModel";
import { IuserTypes } from "./UserModel";
import { IJobTypes } from "./JobsModal";
import { FinduserLocation } from "../../../types/user";


export interface IReq_Mechanics_service_types extends Document{
    _id:Schema.Types.ObjectId,
    userId: IuserTypes;
    userName: string,
    userEmail: string,
    userLocation: FinduserLocation,
    jobId:  IJobTypes;
    jobName: string,
    minWage: number,
    problem: string,
    mechanics: Array<{
      employeeId:  string |IEmployee_types;
      bookingDate: Date; // New field for booking date
      // status:"PENDING"|"ACCEPTED"|"REJECTED"|"CANCELLED"
    }>;
    status: "PENDING" | "CONFIRMED" | "CANCELLED"|"COMPLETED" | "REJECT"|"ACCEPTED",
    bookingDate:Date,
    acceptEmployee: {
        employeeId: IEmployee_types | null;
        acceptTime: Date | null;
      } | null;

     paymentId:string 
  }


const requestSchema = new mongoose.Schema<IReq_Mechanics_service_types>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      userName: { type: String, required: true },
      userEmail: { type: String, required: true },
      userLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String, required: true }
      },
      jobId: {
        type: Schema.Types.ObjectId,
        ref: "Jobs",
        required: true,
      },
      jobName: { type: String, required: true },
      minWage: { type: Number, required: true },
      problem: { type: String, required: true },
      status: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED","REJECT","ACCEPTED"],
        default: "PENDING",
      },
      mechanics: [
        {
          employeeId: { type: Schema.Types.ObjectId, ref: "employee" }, // Just an ID reference
          bookingDate: { type: Date, required: true }, 
          // status: { type: String, enum: ["PENDING", "ACCEPTED", "CANCELLED", "REJECT"], default: "PENDING" },
        }
      ],
      
      bookingDate: { type: Date, required: true },

      acceptEmployee: {
        employeeId: {
          type: Schema.Types.ObjectId,
          ref: "employee",
          default: null,
        },
        acceptTime: {
          type: Date,
          default: null,
        },
      },
      paymentId:{
        type:String,
        default:""

      }

  },{
    timestamps:true
  }
);
  
requestSchema.set("toObject", { virtuals: true, versionKey: false, transform: (_, ret) => { delete ret._id; return ret; }});
requestSchema.set("toJSON", { virtuals: true, versionKey: false, transform: (_, ret) => { delete ret._id; return ret; }});


  export const Request_Service_Mech_model=mongoose.model('RequestMechanics',requestSchema)