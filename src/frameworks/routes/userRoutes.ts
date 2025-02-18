import express from "express";
import { UserMongodbRepositories } from "../../interfaces/repositories/userSide/UserMongoRepositories";
import { CreateUser } from "../../use-cases/userside/auth/createUser";
import { Usercontroller } from "../../interfaces/controllers/user/userController";
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
import { UserServiceController } from "../../interfaces/controllers/user/UserserviceController";
import { MongoReqServiceMechnics } from "../../interfaces/repositories/reqservicemechanics/mongoreqservicemechrep";
import { ReqEmployeeServices_useCase } from "../../use-cases/userside/service/req.employeeservice";
import { User_getReqServiceuseCase } from "../../use-cases/userside/service/get_req_service";
import { UserServiceRazorpayPayment } from "../../use-cases/userside/payments/serviceRazorpayuseCase";
import { ServicePaymentMongoRepositories } from "../../interfaces/repositories/payments/mongoservicePaymentRepositories";
import { UserServiceBookingHistoryusecase } from "../../use-cases/userside/payments/getSevicePaymentCompleted";
import { User_putReqserviceUsecase } from "../../use-cases/userside/service/putReqserviceuseCase";
import { User_getServiceBookingHistoryByUserId } from "../../use-cases/userside/payments/getservicebookingHistory";
import { Emp_getPaymentDetails } from "../../use-cases/employeeside/payment/getPaymentDetails";
import { UserChatcontroller } from "../../interfaces/controllers/user/userChatcontroller";
import { Message_mongoRepositories } from "../../interfaces/repositories/chats/MongoChatsReposotories";
import { User_serchjobsuseCase } from "../../use-cases/userside/service/searchservices";
import { UserLocation_useCase } from "../../use-cases/userside/auth/addlocation";
import { User_getNearestEmployees } from "../../use-cases/userside/service/getnearestEmployees10km";
import { User_putserviceSpecificEmp } from "../../use-cases/userside/service/putservicesendsecficemp";
import { User_CompleteServiceBooking_payment } from "../../use-cases/userside/payments/putservicepaymentComplete";
import { Get_MessagesByuseId } from "../../use-cases/chat/getChatsbyuserId";
import { Employee_get_details_useCase } from "../../use-cases/employeeside/getEmployee";
import { WalletMongoRepositories } from "../../interfaces/repositories/wallet/walletMongoepositories";
import { UserwalletController } from "../../interfaces/controllers/user/userWalletcontroller";
import { Wallet_getuserIduseCase } from "../../use-cases/wallet/getbyuserId";
import { TransactionMongoRepositories } from "../../interfaces/repositories/transaction/transactionMongoRepositories";
import { Transaction_getbyuserId } from "../../use-cases/transactions/getuaserid";
const userRepositories = new UserMongodbRepositories();
const jobRepositories = new Mongo_Job_admin_Repositories();
const Admin_employeeRepositories = new Mongo_Admin_Employees_Repositories();
const employeeRepositories = new EmployeeMongoRepositories();
const serviceRepositories = new Mongo_Service_Booking_Repositories();
const Report_FeedBackRepositoires =
  new Report_FeedBack_user_MongoRepositories();
const reqServiceMechanicsRepositories = new MongoReqServiceMechnics();
const servicepaymentRepositoires = new ServicePaymentMongoRepositories();
const messageRepositories=new Message_mongoRepositories()
const walletRepositories=new WalletMongoRepositories()
const transactionrepositories=new TransactionMongoRepositories()





const createUser = new CreateUser(userRepositories,walletRepositories);
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
const forgotUserCase = new Forgot_PasswordotpUseCase(userRepositories);
const newPassword = new NewPassword(userRepositories);
const userlocation=new UserLocation_useCase(userRepositories)



const createreqservicemechanics = new ReqEmployeeServices_useCase(
  userRepositories,
  employeeRepositories,
  reqServiceMechanicsRepositories
);

const getreqservice = new User_getReqServiceuseCase(
  reqServiceMechanicsRepositories
);

const createServicepayment = new UserServiceRazorpayPayment(
  servicepaymentRepositoires,
  employeeRepositories,
  reqServiceMechanicsRepositories,
  walletRepositories,
  transactionrepositories
  );
  const ConfirmServicePayment=new User_CompleteServiceBooking_payment(
    servicepaymentRepositoires,
    employeeRepositories,
    reqServiceMechanicsRepositories,
    transactionrepositories
  )


const getbookingHistory = new User_getServiceBookingHistoryByUserId(
  reqServiceMechanicsRepositories
);
const cancellBookingService=new User_putReqserviceUsecase(reqServiceMechanicsRepositories)
const getServicePayment=new Emp_getPaymentDetails(servicepaymentRepositoires)
const serachjobsuser=new User_serchjobsuseCase(jobRepositories)
const putserviceSendSpecificEmployee=new User_putserviceSpecificEmp(reqServiceMechanicsRepositories,employeeRepositories)


const getnearestEmployees10km=new User_getNearestEmployees(employeeRepositories)
// messages
const getMessagesByUser=new Get_MessagesByuseId(messageRepositories)
const userGetemployeedetails=new Employee_get_details_useCase(employeeRepositories)




const usergetwallet=new Wallet_getuserIduseCase(walletRepositories)


const gettranasactionByuser=new Transaction_getbyuserId(transactionrepositories)

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
  newPassword,
  userlocation,
  userGetemployeedetails
);

const serviceController = new UserServiceController(
  createreqservicemechanics,
  getreqservice,
  ConfirmServicePayment,
  getbookingHistory,
  cancellBookingService,
  getServicePayment,
  serachjobsuser,
  getnearestEmployees10km,
  putserviceSendSpecificEmployee,
  createServicepayment,
  gettranasactionByuser
);




const userChatController=new UserChatcontroller(getMessagesByUser)
const userWalletController=new UserwalletController(usergetwallet)


const userRouter = express.Router();

userRouter.post("/refresh-token", (req, res) => {
  createAccessToken(req, res, "user");
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

userRouter.put("/profile/:id", Authentication, (req, res, next) => {
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

userRouter.post("/forgot-password/otp", (req, res, next) => {
  userController.User_Post_forgot_password_controll(req, res, next);
});
userRouter.post("/forgot-password/check", (req, res, next) => {
  userController.user_post_forgot_password_otpcheckcontroll(req, res, next);
});
userRouter.post("/forgot-password", (req, res, next) => {
  userController.user_post_newpassword(req, res, next);
});

userRouter.post("/req-services", Authentication, (req, res, next) => {
  serviceController.reqserviceEmployee(req, res, next);
});

userRouter.get(
  "/req-service/:id",

  Authentication,
  (req, res, next) => {
    console.log("get requset");

    serviceController.get_reqServicecontrolle(req, res, next);
  }
);
userRouter.put(
  "/req-service/:id",

  Authentication,
  (req, res, next) => {
    console.log("get requset");

    serviceController.userService_PutReqservecontroll(req, res, next);
  }
);

userRouter.post(
  "/service/payment/razorpay",

  // Authentication,
  (req, res, next) => {
    console.log("payment razorpay");

    serviceController.userServiceRazorpaypayment_Controll(req, res, next);
  }
);
userRouter.post(
"/service/payment/razorpay/confirm/:id",
Authentication,
  (req, res, next) => {
 serviceController.userServiceRazorpaypayment_Confirm_Controll(req,res,next);
  }
);
userRouter.get(
"/booking-history/:id",
Authentication,
  (req, res, next) => {
 serviceController.userService_Bookin_history_Controll(req,res,next);
  }
);


userRouter.get('/service-payment/:id',Authentication,(req,res,next)=>{
  serviceController.userService_GETservicePayment(req,res,next)
})
// userRouter.get('/chats-userId/:id',Authentication,(req,res,next)=>{
//   userChatController.user_getChats(req,res,next)
// })


userRouter.get('/home',Authentication,(req,res,next)=>{
  serviceController.userService_GETsearch(req,res,next)
})
userRouter.put('/location/:id',Authentication,(req,res,next)=>{
  userController.user_putaddlocation(req,res,next)
})
userRouter.get( "/nearest-employees",
  Authentication,
  (req,res,next)=>{
  serviceController.userService_GETNearestEmployees(req,res,next)
})

userRouter.put(
  "/req-service/employee/:id",

  Authentication,
  (req, res, next) => {

    serviceController.userService_putreqserviceSpesificEmployee(req, res, next);
  }
);
userRouter.post(
  "/advance-payment/confirm",

  Authentication,
  (req, res, next) => {

    serviceController.userService_postAdvancePayment(req, res, next);
  }
);

userRouter.get('/chats-userId/:id',Authentication,
  (req,res,next)=>{userChatController.user_getChats(req,res,next)}
)
userRouter.get("/employee/:id", Authentication, (req, res, next) => {
  userController.User_get_employeedetailsControl(req,res,next)
});
userRouter.get("/wallet/userId/:id", Authentication, (req, res, next) => {
  userWalletController.user_getwalletbyuserId_controller(req,res,next)
});
userRouter.post("/report", Authentication, (req, res, next) => {
  userController.User_post_report_feedBack_employee_controll(req,res,next)
});
userRouter.get("/transactions/:id", Authentication, (req, res, next) => {
  serviceController.userService_getTransacationhistory(req,res,next)
});

export default userRouter;
