"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserMongoRepositories_1 = require("../../interfaces/repositories/userSide/UserMongoRepositories");
const createUser_1 = require("../../use-cases/userside/auth/createUser");
const userController_1 = require("../../interfaces/controllers/user/userController");
const SendOtp_1 = require("../../use-cases/userside/auth/SendOtp");
const otpchecking_1 = require("../../use-cases/userside/auth/otpchecking");
const userLogin_1 = require("../../use-cases/userside/auth/userLogin");
const Authservice_1 = require("../../use-cases/userside/auth/Authservice");
const UserEdit_1 = require("../../use-cases/userside/edit/UserEdit");
const userAuthentication_1 = require("../../interfaces/middleware/userside/userAuthentication");
const jwt_auth_token_1 = require("../../interfaces/jwt/jwt_auth_token");
const image_useCase_1 = require("../../use-cases/userside/edit/image_useCase");
const multer_1 = __importDefault(require("../../utils/helper/multer"));
const getJobs_1 = require("../../use-cases/admin/jobs/getJobs");
const mongoJobRepositories_1 = require("../../interfaces/repositories/admin/jobs/mongoJobRepositories");
const get_employees_1 = require("../../use-cases/admin/workerManageMent/get_employees");
const Mongo_Empl_repositories_1 = require("../../interfaces/repositories/admin/employees/Mongo_Empl_repositories");
const user_Service_booking_1 = require("../../use-cases/userside/service/user_Service_booking");
const mongoServiceRepositories_1 = require("../../interfaces/repositories/servicebooking/mongoServiceRepositories");
const EmployeMongoRepositories_1 = require("../../interfaces/repositories/employeeside/EmployeMongoRepositories");
const get_service_booking_1 = require("../../use-cases/userside/service/get_service_booking");
const FeedBack_mongo_Repositories_1 = require("../../interfaces/repositories/userSide/feed-back-employee/FeedBack_mongo_Repositories");
const Report_feedBack_useCase_1 = require("../../use-cases/userside/report-feedback/Report_feedBack_useCase");
const forgototpuseCase_1 = require("../../use-cases/userside/auth/forgototpuseCase");
const newPassword_1 = require("../../use-cases/userside/auth/newPassword");
const UserserviceController_1 = require("../../interfaces/controllers/user/UserserviceController");
const mongoreqservicemechrep_1 = require("../../interfaces/repositories/reqservicemechanics/mongoreqservicemechrep");
const req_employeeservice_1 = require("../../use-cases/userside/service/req.employeeservice");
const get_req_service_1 = require("../../use-cases/userside/service/get_req_service");
const serviceRazorpayuseCase_1 = require("../../use-cases/userside/payments/serviceRazorpayuseCase");
const mongoservicePaymentRepositories_1 = require("../../interfaces/repositories/payments/mongoservicePaymentRepositories");
const putReqserviceuseCase_1 = require("../../use-cases/userside/service/putReqserviceuseCase");
const getservicebookingHistory_1 = require("../../use-cases/userside/payments/getservicebookingHistory");
const getPaymentDetails_1 = require("../../use-cases/employeeside/payment/getPaymentDetails");
const userChatcontroller_1 = require("../../interfaces/controllers/user/userChatcontroller");
const MongoChatsReposotories_1 = require("../../interfaces/repositories/chats/MongoChatsReposotories");
const searchservices_1 = require("../../use-cases/userside/service/searchservices");
const addlocation_1 = require("../../use-cases/userside/auth/addlocation");
const getnearestEmployees10km_1 = require("../../use-cases/userside/service/getnearestEmployees10km");
const putservicesendsecficemp_1 = require("../../use-cases/userside/service/putservicesendsecficemp");
const putservicepaymentComplete_1 = require("../../use-cases/userside/payments/putservicepaymentComplete");
const getChatsbyuserId_1 = require("../../use-cases/chat/getChatsbyuserId");
const getEmployee_1 = require("../../use-cases/employeeside/getEmployee");
const walletMongoepositories_1 = require("../../interfaces/repositories/wallet/walletMongoepositories");
const userWalletcontroller_1 = require("../../interfaces/controllers/user/userWalletcontroller");
const getbyuserId_1 = require("../../use-cases/wallet/getbyuserId");
const transactionMongoRepositories_1 = require("../../interfaces/repositories/transaction/transactionMongoRepositories");
const getuaserid_1 = require("../../use-cases/transactions/getuaserid");
const userRepositories = new UserMongoRepositories_1.UserMongodbRepositories();
const jobRepositories = new mongoJobRepositories_1.Mongo_Job_admin_Repositories();
const Admin_employeeRepositories = new Mongo_Empl_repositories_1.Mongo_Admin_Employees_Repositories();
const employeeRepositories = new EmployeMongoRepositories_1.EmployeeMongoRepositories();
const serviceRepositories = new mongoServiceRepositories_1.Mongo_Service_Booking_Repositories();
const Report_FeedBackRepositoires = new FeedBack_mongo_Repositories_1.Report_FeedBack_user_MongoRepositories();
const reqServiceMechanicsRepositories = new mongoreqservicemechrep_1.MongoReqServiceMechnics();
const servicepaymentRepositoires = new mongoservicePaymentRepositories_1.ServicePaymentMongoRepositories();
const messageRepositories = new MongoChatsReposotories_1.Message_mongoRepositories();
const walletRepositories = new walletMongoepositories_1.WalletMongoRepositories();
const transactionrepositories = new transactionMongoRepositories_1.TransactionMongoRepositories();
const createUser = new createUser_1.CreateUser(userRepositories, walletRepositories);
const sendmailOtp = new SendOtp_1.SendOtp(userRepositories);
const checkotpMail = new otpchecking_1.CheckOtp();
const Loginuser = new userLogin_1.UserLogin(userRepositories);
const googleSignin = new Authservice_1.User_Google_Auth_useCase(userRepositories);
const userEdit = new UserEdit_1.User_Edit_useCase(userRepositories);
const userProfileimage = new image_useCase_1.User_Put_Image_UseCase(userRepositories);
const getallJobs = new getJobs_1.Admin_get_jobs_useCase(jobRepositories);
const getAllEmployees = new get_employees_1.Admin_get_allEmployees_useCase(Admin_employeeRepositories);
const PostServiceBooking = new user_Service_booking_1.User_Post_Service_booking_useCase(serviceRepositories, userRepositories, jobRepositories, employeeRepositories);
const get_service_booking = new get_service_booking_1.User_get_Service_Booking_useCase(serviceRepositories);
const post_Report_user = new Report_feedBack_useCase_1.Report_feedBack_user_useCase(Report_FeedBackRepositoires);
const forgotUserCase = new forgototpuseCase_1.Forgot_PasswordotpUseCase(userRepositories);
const newPassword = new newPassword_1.NewPassword(userRepositories);
const userlocation = new addlocation_1.UserLocation_useCase(userRepositories);
const createreqservicemechanics = new req_employeeservice_1.ReqEmployeeServices_useCase(userRepositories, employeeRepositories, reqServiceMechanicsRepositories);
const getreqservice = new get_req_service_1.User_getReqServiceuseCase(reqServiceMechanicsRepositories);
const createServicepayment = new serviceRazorpayuseCase_1.UserServiceRazorpayPayment(servicepaymentRepositoires, employeeRepositories, reqServiceMechanicsRepositories, walletRepositories, transactionrepositories);
const ConfirmServicePayment = new putservicepaymentComplete_1.User_CompleteServiceBooking_payment(servicepaymentRepositoires, employeeRepositories, reqServiceMechanicsRepositories, transactionrepositories);
const getbookingHistory = new getservicebookingHistory_1.User_getServiceBookingHistoryByUserId(reqServiceMechanicsRepositories);
const cancellBookingService = new putReqserviceuseCase_1.User_putReqserviceUsecase(reqServiceMechanicsRepositories);
const getServicePayment = new getPaymentDetails_1.Emp_getPaymentDetails(servicepaymentRepositoires);
const serachjobsuser = new searchservices_1.User_serchjobsuseCase(jobRepositories);
const putserviceSendSpecificEmployee = new putservicesendsecficemp_1.User_putserviceSpecificEmp(reqServiceMechanicsRepositories, employeeRepositories);
const getnearestEmployees10km = new getnearestEmployees10km_1.User_getNearestEmployees(employeeRepositories);
// messages
const getMessagesByUser = new getChatsbyuserId_1.Get_MessagesByuseId(messageRepositories);
const userGetemployeedetails = new getEmployee_1.Employee_get_details_useCase(employeeRepositories);
const usergetwallet = new getbyuserId_1.Wallet_getuserIduseCase(walletRepositories);
const gettranasactionByuser = new getuaserid_1.Transaction_getbyuserId(transactionrepositories);
const userController = new userController_1.Usercontroller(createUser, sendmailOtp, checkotpMail, Loginuser, googleSignin, userEdit, userProfileimage, getallJobs, getAllEmployees, PostServiceBooking, get_service_booking, post_Report_user, forgotUserCase, newPassword, userlocation, userGetemployeedetails);
const serviceController = new UserserviceController_1.UserServiceController(createreqservicemechanics, getreqservice, ConfirmServicePayment, getbookingHistory, cancellBookingService, getServicePayment, serachjobsuser, getnearestEmployees10km, putserviceSendSpecificEmployee, createServicepayment, gettranasactionByuser);
const userChatController = new userChatcontroller_1.UserChatcontroller(getMessagesByUser);
const userWalletController = new userWalletcontroller_1.UserwalletController(usergetwallet);
const userRouter = express_1.default.Router();
userRouter.post("/refresh-token", (req, res) => {
    (0, jwt_auth_token_1.createAccessToken)(req, res, "user");
});
userRouter.post("/signup", (req, res) => userController.signUp(req, res));
userRouter.post("/signup/otp", (req, res) => userController.OtpChecking(req, res));
userRouter.post("/signup/resendotp", (req, res) => userController.signUp(req, res));
userRouter.post("/login", (req, res) => userController.userlogin(req, res));
userRouter.get("/logout", (req, res, next) => userController.User_get_Logout_controll(req, res, next));
userRouter.post("/google", (req, res, next) => userController.User_Google_Auth(req, res, next));
userRouter.post("/profile/image/:id", multer_1.default.single("image"), (req, res, next) => {
    console.log(req.file);
    (0, userAuthentication_1.Authentication)(req, res, next);
    userController.User_put_image_controll(req, res, next);
});
userRouter.put("/profile/:id", userAuthentication_1.Authentication, (req, res, next) => {
    userController.User_Put_controll(req, res, next);
});
userRouter.get("/jobs", userAuthentication_1.Authentication, (req, res, next) => {
    userController.user_get_allJobs(req, res, next);
});
userRouter.get("/employees", userAuthentication_1.Authentication, (req, res, next) => {
    userController.user_get_allEmplooyees(req, res, next);
});
userRouter.post("/service-booking", userAuthentication_1.Authentication, (req, res, next) => {
    userController.user_post_service_Booking_controll(req, res, next);
});
userRouter.get("/service-booking/:id", userAuthentication_1.Authentication, (req, res, next) => {
    userController.User_get_service_Booking_controll(req, res, next);
});
userRouter.post("/report-feedBack", userAuthentication_1.Authentication, (req, res, next) => {
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
userRouter.post("/req-services", userAuthentication_1.Authentication, (req, res, next) => {
    serviceController.reqserviceEmployee(req, res, next);
});
userRouter.get("/req-service/:id", userAuthentication_1.Authentication, (req, res, next) => {
    console.log("get requset");
    serviceController.get_reqServicecontrolle(req, res, next);
});
userRouter.put("/req-service/:id", userAuthentication_1.Authentication, (req, res, next) => {
    console.log("get requset");
    serviceController.userService_PutReqservecontroll(req, res, next);
});
userRouter.post("/service/payment/razorpay", 
// Authentication,
(req, res, next) => {
    console.log("payment razorpay");
    serviceController.userServiceRazorpaypayment_Controll(req, res, next);
});
userRouter.post("/service/payment/razorpay/confirm/:id", userAuthentication_1.Authentication, (req, res, next) => {
    serviceController.userServiceRazorpaypayment_Confirm_Controll(req, res, next);
});
userRouter.get("/booking-history/:id", userAuthentication_1.Authentication, (req, res, next) => {
    serviceController.userService_Bookin_history_Controll(req, res, next);
});
userRouter.get('/service-payment/:id', userAuthentication_1.Authentication, (req, res, next) => {
    serviceController.userService_GETservicePayment(req, res, next);
});
// userRouter.get('/chats-userId/:id',Authentication,(req,res,next)=>{
//   userChatController.user_getChats(req,res,next)
// })
userRouter.get('/home', userAuthentication_1.Authentication, (req, res, next) => {
    serviceController.userService_GETsearch(req, res, next);
});
userRouter.put('/location/:id', userAuthentication_1.Authentication, (req, res, next) => {
    userController.user_putaddlocation(req, res, next);
});
userRouter.get("/nearest-employees", userAuthentication_1.Authentication, (req, res, next) => {
    serviceController.userService_GETNearestEmployees(req, res, next);
});
userRouter.put("/req-service/employee/:id", userAuthentication_1.Authentication, (req, res, next) => {
    serviceController.userService_putreqserviceSpesificEmployee(req, res, next);
});
userRouter.post("/advance-payment/confirm", userAuthentication_1.Authentication, (req, res, next) => {
    serviceController.userService_postAdvancePayment(req, res, next);
});
userRouter.get('/chats-userId/:id', userAuthentication_1.Authentication, (req, res, next) => { userChatController.user_getChats(req, res, next); });
userRouter.get("/employee/:id", userAuthentication_1.Authentication, (req, res, next) => {
    userController.User_get_employeedetailsControl(req, res, next);
});
userRouter.get("/wallet/userId/:id", userAuthentication_1.Authentication, (req, res, next) => {
    userWalletController.user_getwalletbyuserId_controller(req, res, next);
});
userRouter.post("/report", userAuthentication_1.Authentication, (req, res, next) => {
    userController.User_post_report_feedBack_employee_controll(req, res, next);
});
userRouter.get("/transactions/:id", userAuthentication_1.Authentication, (req, res, next) => {
    serviceController.userService_getTransacationhistory(req, res, next);
});
exports.default = userRouter;
