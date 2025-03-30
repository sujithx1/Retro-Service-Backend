import { NextFunction, Request, Response } from "express";
import { EmployeeSignup } from "../../../use-cases/employeeside/createEmploye";
import { EmployeeSignupValidate } from "../../../utils/helper/Validation";
import { generate_otp } from "../../../utils/otp";
import redisClient from "../../../utils/helper/redis";
import { CheckOtp } from "../../../use-cases/userside/auth/otpchecking";
import { EmployeeSendOtp } from "../../../use-cases/employeeside/sendotp";
import { Emp_Login_useCase } from "../../../use-cases/employeeside/Emp_login";
import {
  GenerateAccessToken,
  GenerateRefreshToken,
} from "../../jwt/jwt_auth_token";
import cloudinary from "../../../utils/helper/cloudinary";
import { Employee_put_Profile_useCase } from "../../../use-cases/employeeside/edit/Emp_put_profile";
import { Employee_put_job_useCase } from "../../../use-cases/employeeside/putJobs/emp_put_jobs";
import { Employee_Service_Booking_useCase } from "../../../use-cases/employeeside/service_booking/Empl_service_booking";
import { Employee_put_Service_booking_useCase } from "../../../use-cases/employeeside/service_booking/put_employee_service_booking";
import { Employee_get_details_useCase } from "../../../use-cases/employeeside/getEmployee";
import { Admin_get_jobs_useCase } from "../../../use-cases/admin/jobs/getJobs";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { User_getdetails } from "../../../use-cases/userside/auth/getUserdetails.usCase";
import { Emp_NewPassword } from "../../../use-cases/employeeside/postnewpassword";
import { Emp_Forgot_PasswordotpUseCase } from "../../../use-cases/employeeside/forgotpassword";
import { Emp_putonDutyuseCase } from "../../../use-cases/employeeside/putonDutyuseCase";
import { Emp_putaddLocationuseCase } from "../../../use-cases/employeeside/putaddlocation";

export class EmployeeController {
  constructor(
    private createEmploye: EmployeeSignup,
    private sendOtp: EmployeeSendOtp,
    private otpcheking: CheckOtp,
    private loginemp: Emp_Login_useCase,
    private putProfile: Employee_put_Profile_useCase,
    private putEMp_job: Employee_put_job_useCase,
    private getEmpl_Bopoking: Employee_Service_Booking_useCase,
    private putEmpl_serviceBooking_status: Employee_put_Service_booking_useCase,
    private getEmployee: Employee_get_details_useCase,
    private getJobs: Admin_get_jobs_useCase,
    private getuserDetails:User_getdetails,
        private postforgot_passwordservice:Emp_Forgot_PasswordotpUseCase,
        private newPassworduseCase:Emp_NewPassword,
        private putDuty:Emp_putonDutyuseCase,
        private empladdlocation:Emp_putaddLocationuseCase
  ) {}

  async Signup(req: Request, res: Response) {
    try {
      const { username, email, phone, password, skills, experience,proof } = req.body;
      const employeData = {
        username,
        email,
        phone,
        password,
        skills,
        experience,
        proof
      };
      EmployeeSignupValidate(employeData);
      const otp = generate_otp();
      console.log("otp",otp);
      
      await this.sendOtp.execute(email, username, otp);
      await redisClient.setEx("empotp", 60, JSON.stringify(otp));
      await redisClient.setEx("empData", 60, JSON.stringify(employeData));
      res.status(200).json({ message: "check your Mail" });
    } catch (error: any) {
      console.log("error employe Signup cntroll", error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async OtpChecking_Employee(req: Request, res: Response) {
    const { otp } = req.body;
    console.log("otp checking", otp);
    try {
      if (!otp) throw new Error("Enter Otp");
      console.log(otp);
      const storedOtp = await redisClient.get("empotp");
      console.log(storedOtp);

      if (!storedOtp) throw new Error("OTP expired ");

      const otpvalidate = await this.otpcheking.execute(
        Number(otp),
        Number(storedOtp)
      );
      if (!otpvalidate) throw new Error("Invalid OTP");

      await redisClient.del("empotp");
      console.log(await redisClient.get("empotp"));

      console.log(otpvalidate);
      const employeData = await redisClient.get("empData");
      console.log(employeData);

      if (!employeData) throw new Error("employeData Not found ");
      const employeDetail = JSON.parse(employeData);
      const employee = await this.createEmploye.execute(employeDetail);
      const { password: _, ...withoutpassword } = employee;
      res
        .status(201)
        .json({ message: "Employee Created", employe: withoutpassword });
    } catch (error: any) {
      console.log("otp checking controller emp", error.message);
      res.status(400).json({ error: error.message });
    }
  }
  async Emp_logiConroll(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log("emp_login controller call");

    try {
      const employee = await this.loginemp.execute(email, password);
      const refresh_token = GenerateRefreshToken(employee.id, employee.role);
      const access_token = GenerateAccessToken(employee.id, employee.role);
      const { password: _, ...withoutpassword } = employee;
      res
        .cookie("employee_refreshToken", refresh_token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          message: "Employee login success",
          employee: withoutpassword,
          token: access_token,
        });
    } catch (error: any) {
      console.log("login controller err", error.message);

      res.status(400).json({ error: error.message });
    }
  }

  async Employee_Put_Profile_Controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.body);
      const { username, phone, profilePic, experience } = req.body;

      const { id } = req.params;

      // Validate inputs
      if (!username || !phone  || !experience) {
        return next(new Error("Required fields are missing"));
      }
      if (!id) {
        return next(new Error("User ID is required"));
      }
      if (!profilePic) {
        return next(new Error("Profile picture is missing"));
      }
      console.log("Username and phone:", username, phone);

      // Cloudinary upload

      const cloudinaryUpload = await cloudinary.uploader.upload(profilePic, {
        folder: "/employee-profilePic",
      });

      console.log("Cloudinary upload successful:", cloudinaryUpload);

      const user = await this.putProfile.execute(
        id,
        username,
        phone,
        cloudinaryUpload.secure_url,

        Number(experience),
        
      );
      console.log("Updated user:", user);

      const { password: _, ...withoutPassword } = user;
      console.log("heyyyy");
      // Send success response
      return res.status(200).json({
        message: "employee updated successfully",
        employee: withoutPassword,
      });
    } catch (error) {
      return next(error);
    }
  }

  async Employee_get_Logout_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userToken = req.cookies.employee_refreshToken;
      if (userToken) res.clearCookie("employee_refreshToken");

      res.status(200).json({ message: "success logout" });
    } catch (error: any) {
      console.log("error userlogout", error.message);
      next(error);
    }
  }
  async Employee_put_job_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { jobAdd } = req.body;
      console.log(jobAdd);
      if (!jobAdd) {
        return next(new Error("required field"));
      }

      const { id } = req.params;
      if (!id) return next(new Error("Missing  id"));

      const putJob = await this.putEMp_job.execute(id, jobAdd.name);
      const { password: _, ...withoutPass } = putJob;

     return res.status(200).json({
        message: "success edited Employee Job ",
        employee: withoutPass,
      });
    } catch (error: any) {
      console.log("error put job ", error.message);
      next(error);
    }
  }

  async Employee_get_Service_Booking_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("empl get controller");

      const { id } = req.params;
      if (!id) {
        return next(new Error("id missing"));
      }
      const services = await this.getEmpl_Bopoking.execute(id);

      // console.log(services);

      res.status(200).json({ message: "success", services });
    } catch (error: any) {
      console.log("error userlogout", error.message);
      return next(error);
    }
  }

  async Employee_put_serviceBooking_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (!id) return next(new Error("id is Required"));
      const { status } = req.body;
      console.log(req.body);

      if (!status) return next(new Error("Status is required"));

      const service = await this.putEmpl_serviceBooking_status.execute(
        id,
        status
      );
      return res.status(200).json({ message: "success", service });
    } catch (error) {
      console.log("err-> Employee_put_serviceBooking_controll", error);
      return next(error);
    }
  }

  async Employee_get_details_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (!id) return next(new Error("id missing"));
      const employe = await this.getEmployee.execute(id);
      const { password: _, ...without } = employe;
      return res.status(200).json({ message: "success", employee: without });
    } catch (error) {
      return next(error)
    }
  }

  async admin_get_Jobs_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("get job controller");

      const jobs = await this.getJobs.execute();
      return res.status(200).json({ message: "success", jobs });
    } catch (error: any) {
      console.log("error-> admin-getjob controller", error.message);
      return next(error);
    }
  }
  
  async Employee_get_userdetailsControl(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (!id) return next(new CustomError("id missing",401,AppError.ValidationError));
      const user = await this.getuserDetails.execute(id)
      const { password: _, ...without } = user;
      return res.status(200).json({ message: "success", user: without });
    } catch (error) {
      return next(error)

    }
  }
  async Employee_Post_forgot_password_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {email} = req.body;
      console.log("forgot password",email);
      
      await this.postforgot_passwordservice.execute(email)

      res.status(200).json({message:"check Your Email",email})
    } catch (error) {
      return next(error)

    }
  }
  async Employee_post_forgot_password_otpcheckcontroll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {otp} = req.body;
      if(!otp)  throw new CustomError("missig filed",401,AppError.ValidationError)
        console.log(otp);
      const storedOtp = await redisClient.get("forgot-password-otp");
      if (!storedOtp) throw new CustomError("OTP expired",401,AppError.OtpExpired);
      await this.otpcheking.execute(Number(otp),Number(storedOtp))

        
      res.status(200).json({message:"change your password"})
    } catch (error) {
      return next(error)

    }
  }

  
  async Employee_post_newpassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {email,password} = req.body;
      if(!email|| !password)  throw new CustomError("missig filed",401,AppError.ValidationError)
        console.log(email,password);    
      await this.newPassworduseCase.execute(email,password)
      res.status(200).json({message:"success",success:true})
    } catch (error) {
      return next(error)

    }
  }

  async Employee_put_onDuty(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("duty controller ");
      
      const {id} = req.params
      const {duty } = req.body;
      console.log(id,duty);  
      if(!id)  throw new CustomError("missig id",401,AppError.ValidationError)
      // if(duty=="")  throw new CustomError("missig duty",401,AppError.ValidationError)
        
      const dutyemployee=await this.putDuty.execute(id,duty)

      res.status(200).json({message:"success",success:true,duty:dutyemployee})
    } catch (error) {
      return next(error)

    }
  }

  

  async Employee_putaddlocation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {id}=req.params
      console.log("body",req.body);
      
      console.log(id);
      
      const {lat,lng,address}=req.body
      if(!id) return new CustomError("missing id",401,AppError.ValidationError)
      if(!lat||!lng||!address) return new CustomError("missing field",401,AppError.ValidationError)
        const location=await this.empladdlocation.execute(id,lat,lng,address)
      res.status(200).json({message:"success",success:true,location})


    } catch (error) {
      console.log("err->User_get_service_Booking_controll", error);
      return next(error);
    }
  }



  
}
