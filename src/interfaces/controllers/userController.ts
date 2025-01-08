import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../use-cases/userside/auth/createUser";
// import { SendOtp } from "../../use-cases/userside/SendOtp"
import { generate_otp } from "../../utils/otp";
import { CheckOtp } from "../../use-cases/userside/auth/otpchecking";
import { SendOtp } from "../../use-cases/userside/auth/SendOtp";
import { loginValidates, UserValidation } from "../../utils/helper/Validation";
import redisClient from "../../utils/helper/redis";
import { UserLogin } from "../../use-cases/userside/auth/userLogin";
import {
  GenerateAccessToken,
  GenerateRefreshToken,
} from "../jwt/jwt_auth_token";
import { User_Google_Auth_useCase } from "../../use-cases/userside/auth/Authservice";
import { User_Edit_useCase } from "../../use-cases/userside/edit/UserEdit";
import { User_Put_Image_UseCase } from "../../use-cases/userside/edit/image_useCase";
import cloudinary from "../../utils/helper/cloudinary";
import { Admin_get_jobs_useCase } from "../../use-cases/admin/jobs/getJobs";
import { Admin_get_allEmployees_useCase } from "../../use-cases/admin/workerManageMent/get_employees";
import { User_Post_Service_booking_useCase } from "../../use-cases/userside/service/user_Service_booking";
import { User_get_Service_Booking_useCase } from "../../use-cases/userside/service/get_service_booking";
import { Report_feedBack_user_useCase } from "../../use-cases/userside/report-feedback/Report_feedBack_useCase";
import { Forgot_PasswordotpUseCase } from "../../use-cases/userside/auth/forgototpuseCase";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";
import { NewPassword } from "../../use-cases/userside/auth/newPassword";
export class Usercontroller {
  constructor(
    private createUser: CreateUser,
    private sendMails: SendOtp,
    private checkOtp: CheckOtp,
    private loginUser: UserLogin,

    private AuthService: User_Google_Auth_useCase,
    private putUser: User_Edit_useCase,
    private putProfileImage: User_Put_Image_UseCase,

    private getAlljobs: Admin_get_jobs_useCase,
    private getAllEmployees: Admin_get_allEmployees_useCase,
    private postServiceBooking: User_Post_Service_booking_useCase,
    private getEmployee_serviceBooking: User_get_Service_Booking_useCase,
    private postUser_report_feedback: Report_feedBack_user_useCase,
    private postforgot_passwordservice:Forgot_PasswordotpUseCase,
    private newPassworduseCase:NewPassword
  ) {}

  async signUp(req: Request, res: Response) {
    try {
      const { username, email, phone, password } = req.body;
 
      const userData = { username, email, phone, password };

      UserValidation({ username, email, phone, password });
      const otp = generate_otp();
      console.log("otp", otp);

      await this.sendMails.exicute(email, username, otp);

      await redisClient.setEx("otp", 60, JSON.stringify(otp));
      await redisClient.setEx("userData", 60, JSON.stringify(userData));

      res.status(200).json({ message: "Enter Otp check your Email" });
    } catch (error: any) {
      console.log("errpr", error.message);

      res.status(400).json({ error: error.message });
    }
  }
  async OtpChecking(req: Request, res: Response) {
    try {
      const { otp } = req.body;
      console.log("otp checking", otp);

      if (!otp) throw new Error("Enter Otp");
      console.log(otp);
      const storedOtp = await redisClient.get("otp");
      if (!storedOtp) throw new Error("OTP expired ");

      const otpvalidate = await this.checkOtp.execute(
        Number(otp),
        Number(storedOtp)
      );
      if (!otpvalidate) throw new Error("Invalid OTP");

      await redisClient.del("otp");
      console.log(await redisClient.get("otp"));

      console.log(otpvalidate);
      const userData = await redisClient.get("userData");
      console.log(userData);

      if (!userData) throw new Error("userData Not found ");
      const userDetails = JSON.parse(userData);
      const user = await this.createUser.exicute(userDetails);
      const { password: _, ...withoutPassword } = user;
      res
        .status(201)
        .json({ mesage: "user registerd ", user: withoutPassword });
    } catch (error: any) {
      console.error("Error in OtpChecking:", error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async userlogin(req: Request, res: Response) {
    try {
      console.log("login render");

      const { email, password } = req.body;
      loginValidates(email, password);
      const user = await this.loginUser.execute(email, password);
      const refresh_token = GenerateRefreshToken(user.id, user.role);
      const access_token = GenerateAccessToken(user.id, user.role);

      const { password: _, isAdmin, ...withoutpassword } = user;
      console.log("user log in success");

      res
        .cookie("user_refreshToken", refresh_token, {
          httpOnly: true,
        })

        .status(200)
        .json({
          message: "login success",
          token: access_token,
          user: withoutpassword,
        });
    } catch (error: any) {
      console.log("error from login user ", error.message);

      res.status(400).json({ error: error.message });
    }
  }

  async User_Google_Auth(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("google Signin");

      const { credential } = req.body;
      console.log(credential);

      const user = await this.AuthService.execute(credential);
      const refresh_token = GenerateRefreshToken(user.id, user.role);
      const access_token = GenerateAccessToken(user.id, user.role);

      const { password, isAdmin, ...without } = user;

      console.log("tokenssss    " + access_token, refresh_token);

      res
        .cookie("user_refreshToken", refresh_token, {
          httpOnly: true,
        })
        .status(200)
        .json({ message: "login success", user: without, token: access_token });
    } catch (error: any) {
      console.log("error -> usercntrol - > googleSignin", error.message);
      next(error);
    }
  }
  async User_get_Logout_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userToken = req.cookies.user_refreshToken;
      if (userToken) res.clearCookie("user_refreshToken");

      res.status(200).json({ message: "success logout" });
    } catch (error: any) {
      console.log("error userlogout", error.message);
      next(error);
    }
  }

  async User_Put_controll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const { username, phone, profilePic } = req.body;

      const { id } = req.params;

      // Validate inputs
      if (!username || !phone) {
        return next(new Error("Required fields are missing"));
      } else if (!id) {
        return next(new Error("User ID is required"));
      } else if (!profilePic) {
        return next(new Error("Profile picture is missing"));
      } else {
        console.log("Username and phone:", username, phone);

        // Cloudinary upload

        const cloudinaryUpload = await cloudinary.uploader.upload(profilePic, {
          folder: "/profilePic",
        });

        console.log("Cloudinary upload successful:", cloudinaryUpload);

        const user = await this.putUser.execute(
          id,
          username,
          phone,
          cloudinaryUpload.secure_url
        );
        console.log("Updated user:", user);

        const { password: _, ...withoutPassword } = user;
        console.log("heyyyy");
        // Send success response
        return res.status(200).json({
          message: "User updated successfully",
          user: withoutPassword,
        });
      }
    } catch (error: any) {
      console.error("Unhandled error in User_Put_controll:", error.message);
      return next(error);
    }
  }

  async User_put_image_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("imag controller");

      const { id } = req.params;
      if (!id) {
        return next(new Error("id not found"));
      }
      // const profile_pic=req.file?req.file.filename:null

      // if(!profile_pic) return next(new Error("Image Not Found"))
      //   console.log("profile pic",profile_pic);
      if (!req.file) {
        return next(new Error("file not upload"));
      }
      const localFilePath = req.file.filename; // File path from local upload
      console.log("locaalpath", localFilePath);

      // // Upload the file to Cloudinary
      // cloudinary.uploader.upload("path/to/test-image.jpg", { folder: "test-folder" })
      // .then((result) => console.log("Manual test successful:", result))
      // .catch((error) => console.error("Manual test failed:", error));

      const userProfile = await this.putProfileImage.execute(id, localFilePath);
      console.log(userProfile + "userrrrrrrrrrrrrrrrrrrrr");

      const { password: _, ...without } = userProfile;

      return res.status(200).json({ message: "image updated", user: without });
    } catch (error) {
      next(error);
    }
  }

  async user_get_allJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = await this.getAlljobs.execute();
      res.status(200).json({ message: "success", jobs: jobs });
    } catch (error) {
      next(error);
    }
  }

  async user_get_allEmplooyees(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employees = await this.getAllEmployees.execute();
      const withoutPassword = employees.map(({ password, ...rest }) => rest);
      res.status(200).json({ message: "success", employees: withoutPassword });
    } catch (error) {
      next(error);
    }
  }

  async user_post_service_Booking_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        userId,
        userName,
        userEmail,
        problem,
        userLocation,
        employeeId,
        employeeName,
        empLocation,
        jobId,
        jobName,
        ServiceMin_wage,
      } = req.body;
      console.log(req.body);

      if (
        !userId ||
        !userName ||
        !userEmail ||
        !problem ||
        !userLocation ||
        !employeeId ||
        !employeeName ||
        !empLocation ||
        !jobId ||
        !jobName ||
        !ServiceMin_wage
      ) {
        return next(new Error("All fields Required.."));
      }

      const booking = await this.postServiceBooking.execute(
        userId,
        employeeId,
        jobId,
        userLocation,
        Number(ServiceMin_wage),
        problem
      );

      return res.status(201).json({ message: "success", service: booking });
    } catch (error) {
      return next(error);
    }
  }

  async User_get_service_Booking_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (!id) return next(new Error("Id is missing"));

      const service = await this.getEmployee_serviceBooking.execute(id);
      return res.status(200).json({ message: "success", service });
    } catch (error) {
      console.log("err->User_get_service_Booking_controll", error);
      return next(error);
    }
    }



  async User_post_report_feedBack_employee_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userid, userEmail, name, feedBack, employeeId } = req.body;
      console.log(req.body);

      if (!userid || !userEmail || !name || !feedBack || !employeeId)
        return next(new Error(" missing Feild"));

      const feedback = await this.postUser_report_feedback.execute(
        userid,
        name,
        employeeId,
        feedBack
      );

      return res.status(200).json({ message: "success", feedback });
    } catch (error) {
      console.log("err->User_get_service_Booking_controll", error);
      return next(error);
    }
  }

  async User_Post_forgot_password_controll(
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
      console.log("err->User_get_service_Booking_controll", error);
      return next(error);
    }
  }
  async user_post_forgot_password_otpcheckcontroll(
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
      await this.checkOtp.execute(Number(otp),Number(storedOtp))

        
      res.status(200).json({message:"change your password"})


    } catch (error) {
      console.log("err->User_get_service_Booking_controll", error);
      return next(error);
    }
  }


  async user_post_newpassword(
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
      console.log("err->User_get_service_Booking_controll", error);
      return next(error);
    }
  }



}
