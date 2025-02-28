import { NextFunction } from "express";
import { CustomError } from "../errors/custom.errors";
import { AppError } from "../errors/error.enum";

export const UserValidation = (data: {
  username: string;
  email: string;
  phone: string;
  password: string;

}): boolean => {
  const { username, email, phone, password } = data;
  if (!username || !email || !phone || !password) {
    throw new Error("All field Required")
  
  }
  return true;
};
export const StoreSignupValidation = (data: {
  name: string;
  owner_email: string;
  owner_name:string;
  owner_phone: string;
  password: string;
  

}): boolean => {
  const { name, owner_email, owner_phone,owner_name, password } = data;
  if (!name || !owner_email || !owner_phone || !password||!owner_name) {
    throw new CustomError("All field Required",401,AppError.ValidationError)
  
  }
  return true;
};







export  const loginValidates=(email:string,password:string):boolean=>{
  if(!email || !password){
throw new Error("Missing Login field ")
   
  }
  return true
}


export const EmployeeSignupValidate=(data: {
  username: string;
  email: string;
  phone: string;
  password: string;
  skills:string;
  experience:string,
  
}): boolean => {
  const { username, email, phone, password,skills,experience } = data;
  if (!username || !email || !phone || !password|| !skills || !experience) {
     throw new Error("All field Required");
   
  }
  return true;
};


export const category_Validation=(name:string,description:string,next:NextFunction):boolean=>{
  if(!name||!description){
    next(new Error('All field is required'))
    return false
  }
  return true

}

