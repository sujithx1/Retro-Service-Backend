import express from "express";
import { UserMongodbRepositories } from "../../interfaces/repositories/userSide/UserMongoRepositories";
import { CreateUser } from "../../use-cases/userside/auth/createUser";
import { Usercontroller } from "../../interfaces/controllers/userController";
import { SendOtp } from "../../use-cases/userside/auth/SendOtp";
import { CheckOtp } from "../../use-cases/userside/auth/otpchecking";
import { UserLogin } from "../../use-cases/userside/auth/userLogin";
import { User_Google_Auth_useCase } from "../../use-cases/userside/auth/Authservice"; 
import { User_Edit_useCase } from "../../use-cases/userside/edit/UserEdit";
import { Authentication } from "../../interfaces/middleware/userside/userAuthentication";
import { createAccessToken } from "../../interfaces/jwt/jwt_auth_token";
import { User_Put_Image_UseCase } from "../../use-cases/userside/edit/image_useCase";
import upload from "../../utils/helper/multer";
import { Admin_get_jobs_useCase } from "../../use-cases/admin/jobs/getJobs";
import { Mongo_Job_admin_Repositories } from "../../interfaces/repositories/admin/jobs/mongoJobRepositories";
import { Admin_get_allEmployees_useCase } from "../../use-cases/admin/workerManageMent/get_employees";
import { Mongo_Admin_Employees_Repositories } from "../../interfaces/repositories/admin/employees/Mongo_Empl_repositories";
import { User_Post_Service_booking_useCase } from "../../use-cases/userside/service/user_Service_booking";
import { Mongo_Service_Booking_Repositories } from "../../interfaces/repositories/servicebooking/mongoServiceRepositories";
import { EmployeeMongoRepositories } from "../../interfaces/repositories/employeeside/EmployeMongoRepositories";
import { User_get_Service_Booking_useCase } from "../../use-cases/userside/service/get_service_booking";
import { Report_FeedBack_user_MongoRepositories } from "../../interfaces/repositories/userSide/feed-back-employee/FeedBack_mongo_Repositories";
import { Report_feedBack_user_useCase } from "../../use-cases/userside/report-feedback/Report_feedBack_useCase";
import { Forgot_PasswordotpUseCase } from "../../use-cases/userside/auth/forgototpuseCase";
import { NewPassword } from "../../use-cases/userside/auth/newPassword";
import { ServiceController } from "../../interfaces/controllers/serviceController";
const userRepositories = new UserMongodbRepositories();
const jobRepositories = new Mongo_Job_admin_Repositories();
const Admin_employeeRepositories = new Mongo_Admin_Employees_Repositories();
const employeeRepositories = new EmployeeMongoRepositories();
const serviceRepositories = new Mongo_Service_Booking_Repositories();
const Report_FeedBackRepositoires =new Report_FeedBack_user_MongoRepositories();


const createUser = new CreateUser(userRepositories);
const sendmailOtp = new SendOtp(userRepositories);
const checkotpMail = new CheckOtp();
const Loginuser = new UserLogin(userRepositories);
const googleSignin = new User_Google_Auth_useCase(userRepositories);
const userEdit = new User_Edit_useCase(userRepositories);
const userProfileimage = new User_Put_Image_UseCase(userRepositories);
const getallJobs = new Admin_get_jobs_useCase(jobRepositories);
const getAllEmployees = new Admin_get_allEmployees_useCase(
  Admin_employeeRepositories
);
const PostServiceBooking = new User_Post_Service_booking_useCase(
  serviceRepositories,
  userRepositories,
  jobRepositories,
  employeeRepositories
);
const get_service_booking = new User_get_Service_Booking_useCase(
  serviceRepositories
);
const post_Report_user = new Report_feedBack_user_useCase(
  Report_FeedBackRepositoires
);
const forgotUserCase=new Forgot_PasswordotpUseCase(userRepositories)
const newPassword=new NewPassword(userRepositories)

const userController = new Usercontroller(
  createUser,
  sendmailOtp,
  checkotpMail,
  Loginuser,
  googleSignin,
  userEdit,
  userProfileimage,
  getallJobs,
  getAllEmployees,
  PostServiceBooking,
  get_service_booking,
  post_Report_user,
  forgotUserCase,
  newPassword

);


const serviceController=new ServiceController()

const userRouter = express.Router();

userRouter.post("/refresh-token", (req, res) => {
  createAccessToken(req, res,"user_refreshToken");
});
userRouter.post("/signup", (req, res) => userController.signUp(req, res));
userRouter.post("/signup/otp", (req, res) =>
  userController.OtpChecking(req, res)
);
userRouter.post("/signup/resendotp", (req, res) =>
  userController.signUp(req, res)
);
userRouter.post("/login", (req, res) => userController.userlogin(req, res));
userRouter.get("/logout", (req, res, next) =>
  userController.User_get_Logout_controll(req, res, next)
);
userRouter.post("/google", (req, res, next) =>
  userController.User_Google_Auth(req, res, next)
);

userRouter.post(
  "/profile/image/:id",
  upload.single("image"),
  (req, res, next) => {
    console.log(req.file);

    Authentication(req, res, next);
    userController.User_put_image_controll(req, res, next);
  }
);

userRouter.put("/profile/:id",
  Authentication,
   (req, res, next) => {
    userController.User_Put_controll(req, res, next);
});

userRouter.get(
  "/jobs",

  Authentication,
  (req, res, next) => {
    userController.user_get_allJobs(req, res, next);
  }
);

userRouter.get("/employees", Authentication, (req, res, next) => {
  userController.user_get_allEmplooyees(req, res, next);
});

userRouter.post("/service-booking", Authentication, (req, res, next) => {
  userController.user_post_service_Booking_controll(req, res, next);
});

userRouter.get("/service-booking/:id", Authentication, (req, res, next) => {
  userController.User_get_service_Booking_controll(req, res, next);
});

userRouter.post("/report-feedBack", Authentication, (req, res, next) => {
  userController.User_post_report_feedBack_employee_controll(req, res, next);
});

userRouter.post('/forgot-password/otp',(req,res,next)=>{
  userController.User_Post_forgot_password_controll(req,res,next)
})
userRouter.post('/forgot-password/check',(req,res,next)=>{
  userController.user_post_forgot_password_otpcheckcontroll(req,res,next)
})
userRouter.post('/forgot-password',(req,res,next)=>{
  userController.user_post_newpassword(req,res,next)
})

userRouter.post('/req-services',Authentication,(req,res,next)=>{
  serviceController.reqserviceEmployee(req,res,next)
})


export default userRouter;
