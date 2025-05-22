import mongoose, { Document, Schema } from "mongoose";
import { IuserTypes } from "./UserModel";
import { IEmployee_types } from "./EmployeeModel";
import { IJobTypes } from "./JobsModal";

export interface IService_Booking_types extends Document{
    _id:Schema.Types.ObjectId,
    user:IuserTypes,
    employee:IEmployee_types,
    job:IJobTypes,
    userLocation:string,
    status: "PENDING" | "CONFIRMED" | "CANCELLED"|"COMPLETED",
    bookingDate:Date,
    service_minWage:number, 
    problem:string


}

const Service_booking_schema = new Schema<IService_Booking_types>(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    employee: {
      type: mongoose.Schema.ObjectId,
      ref: "employee",
      required: true,
    },
    job: {
      type: mongoose.Schema.ObjectId,
      ref: "Jobs",
      required: true,
    },
    userLocation: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED","COMPLETED"],
      default: "PENDING",
    },
    bookingDate: { type: Date, required: true },
    service_minWage:{type:Number,required:true},
    problem:{type:String,required:true}
    
  },
  {
    timestamps: true,
  }
);



export const Service_BookingModel=mongoose.model("ServiceBooking",Service_booking_schema);   