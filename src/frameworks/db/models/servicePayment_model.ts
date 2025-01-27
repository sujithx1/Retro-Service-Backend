import mongoose, { Schema, Document } from 'mongoose';
import { IuserTypes } from './UserModel';
import { IEmployee_types } from './EmployeeModel';
import { IReq_Mechanics_service_types } from './reqserviceMechanics';

interface ServicePayment extends Document {
  userId: mongoose.Types.ObjectId |IuserTypes;
  employeeId: mongoose.Types.ObjectId |IEmployee_types;
  serviceId:mongoose.Types.ObjectId | IReq_Mechanics_service_types;
  amount: number;
  paymentId?: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: Date;
  updatedAt: Date;
  serviceDetails: {
    name: string;
    phone: string;
    problem: string;
    vehicleNumber: string;
  };
  jobName:string
}

const ServicePaymentSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RequestMechanics',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
   
  
    paymentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PENDING" , "COMPLETED" , "FAILED"],
      default: "PENDING",
      required: true,
    },
    serviceDetails: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      problem: { type: String, required: true },
      vehicleNumber: { type: String, required: true },
    },
    jobName:{type:String,required:true}
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);


export const ServicePaymentModel = mongoose.model<ServicePayment>('ServicePayment', ServicePaymentSchema);



            
 
