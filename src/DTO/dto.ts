import { AcceptEmployee_types, ReqService_MechanicTypes } from "../entities/reqserviceEntities";
import { FinduserLocation, Locationuser_types } from "../types/user";


export interface UserResponsDto{
                 id: string,
                 username: string,
                 email: string,
                 phone: string,
                 isActive: boolean ,
                 profilePic: string ,
                 isAdmin: boolean,
                 authSource?: "self" | "google",
                 role:"user"|"admin",
                 location?:Locationuser_types,
                 createdAt?: Date,
                 updatedAt?: Date
}


export interface RequsetServiceResponseDto{
      id:string,
             userId: string,
             userName: string,
             userEmail: string,
            userLocation: FinduserLocation,
            jobId:string,
            jobName: string,
            minWage: number,
             problem: string,
             mechanics:ReqService_MechanicTypes[],
            status: "PENDING" | "CONFIRMED" | "CANCELLED"|"COMPLETED"|"REJECT"|"ACCEPTED" ,
            bookingDate:Date,
            acceptEmployee:AcceptEmployee_types|null ,
            paymentId?:string
}


export interface ServiceResponseDto{
          id:string,    
             userId:string,
         employeeId:string,
         jobId:string,
         userLocation:string,
         status:"PENDING"| "CONFIRMED"| "CANCELLED" |"COMPLETED",
         bookingDate:Date,
         service_Minwage:number,
         problem:string,
         userName?:string,
         employeeName?:string,
         JobName?:string,
         userProfilePic?:string,
         employeeLocation?:string, 
         userPhone?:string,   
         createdAt?:Date,
         updatedAt?:Date
}



export interface  MechanicResponesDto{
         id: string,
         username: string,
         email: string,
         phone: string,
         skills:string[],
         experience:number,
         isValidated:boolean,
         proof:string,
         isActive:boolean,
         profilePic: string,
         location?:Locationuser_types,
         authSource?: "self" | "google",
         role:string,
         revenue?:number,
         onDuty:boolean,
         FCM_token?:string,
         createdAt?: Date,
         updatedAt?: Date
}



export interface StoreResponseDto{
          id:string,
         name:string,
         owner_name:string,
         owner_email:string,
         owner_phone:string,
         isActive:boolean,
         storeId:string,
         profile_pic:string,
         location?:Locationuser_types,
         createdAt?: Date,
         updatedAt?: Date
}