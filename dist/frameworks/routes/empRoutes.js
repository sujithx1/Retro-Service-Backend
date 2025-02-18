"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmployeeController_1 = require("../../interfaces/controllers/employee/EmployeeController");
const jwt_auth_token_1 = require("../../interfaces/jwt/jwt_auth_token");
const userAuthentication_1 = require("../../interfaces/middleware/userside/userAuthentication");
const mongoJobRepositories_1 = require("../../interfaces/repositories/admin/jobs/mongoJobRepositories");
const EmployeMongoRepositories_1 = require("../../interfaces/repositories/employeeside/EmployeMongoRepositories");
const mongoServiceRepositories_1 = require("../../interfaces/repositories/servicebooking/mongoServiceRepositories");
const getJobs_1 = require("../../use-cases/admin/jobs/getJobs");
const createEmploye_1 = require("../../use-cases/employeeside/createEmploye");
const Emp_put_profile_1 = require("../../use-cases/employeeside/edit/Emp_put_profile");
const Emp_login_1 = require("../../use-cases/employeeside/Emp_login");
const getEmployee_1 = require("../../use-cases/employeeside/getEmployee");
const emp_put_jobs_1 = require("../../use-cases/employeeside/putJobs/emp_put_jobs");
const sendotp_1 = require("../../use-cases/employeeside/sendotp");
const Empl_service_booking_1 = require("../../use-cases/employeeside/service_booking/Empl_service_booking");
const put_employee_service_booking_1 = require("../../use-cases/employeeside/service_booking/put_employee_service_booking");
const otpchecking_1 = require("../../use-cases/userside/auth/otpchecking");
const express_1 = __importDefault(require("express"));
const getreqservicewithemployeeid_usecase_1 = require("../../use-cases/userside/service/getreqservicewithemployeeid.usecase");
const EmpServiceController_1 = require("../../interfaces/controllers/employee/EmpServiceController");
const mongoreqservicemechrep_1 = require("../../interfaces/repositories/reqservicemechanics/mongoreqservicemechrep");
const put_acceptreqacceptEmployee_1 = require("../../use-cases/employeeside/service_booking/put_acceptreqacceptEmployee");
const mongoservicePaymentRepositories_1 = require("../../interfaces/repositories/payments/mongoservicePaymentRepositories");
const getPaymentDetails_1 = require("../../use-cases/employeeside/payment/getPaymentDetails");
const employeechatcontroller_1 = require("../../interfaces/controllers/employee/employeechatcontroller");
const MongoChatsReposotories_1 = require("../../interfaces/repositories/chats/MongoChatsReposotories");
const getchatbyEmployeeid_1 = require("../../use-cases/chat/getchatbyEmployeeid");
const getUserdetails_usCase_1 = require("../../use-cases/userside/auth/getUserdetails.usCase");
const UserMongoRepositories_1 = require("../../interfaces/repositories/userSide/UserMongoRepositories");
const forgotpassword_1 = require("../../use-cases/employeeside/forgotpassword");
const postnewpassword_1 = require("../../use-cases/employeeside/postnewpassword");
const putonDutyuseCase_1 = require("../../use-cases/employeeside/putonDutyuseCase");
const putaddlocation_1 = require("../../use-cases/employeeside/putaddlocation");
const walletMongoepositories_1 = require("../../interfaces/repositories/wallet/walletMongoepositories");
const getuaserid_1 = require("../../use-cases/transactions/getuaserid");
const transactionMongoRepositories_1 = require("../../interfaces/repositories/transaction/transactionMongoRepositories");
const putwithdrawamount_1 = require("../../use-cases/employeeside/payment/putwithdrawamount");
const getbyemployeeId_1 = require("../../use-cases/wallet/getbyemployeeId");
// repositories
const empRepositories = new EmployeMongoRepositories_1.EmployeeMongoRepositories();
const service_bookingRep = new mongoServiceRepositories_1.Mongo_Service_Booking_Repositories();
const adminjobRepositoies = new mongoJobRepositories_1.Mongo_Job_admin_Repositories();
const reqServiceMechanicsRepositories = new mongoreqservicemechrep_1.MongoReqServiceMechnics();
const servce_paymentRepositories = new mongoservicePaymentRepositories_1.ServicePaymentMongoRepositories();
const chatrepositories = new MongoChatsReposotories_1.Message_mongoRepositories();
const userRepositories = new UserMongoRepositories_1.UserMongodbRepositories();
const walletRepositories = new walletMongoepositories_1.WalletMongoRepositories();
const transactionrepositories = new transactionMongoRepositories_1.TransactionMongoRepositories();
// usecases
const createEmployee = new createEmploye_1.EmployeeSignup(empRepositories, walletRepositories);
const sendmailOtp = new sendotp_1.EmployeeSendOtp(empRepositories);
const checkOtp = new otpchecking_1.CheckOtp();
const login = new Emp_login_1.Emp_Login_useCase(empRepositories);
const forgotUserCase = new forgotpassword_1.Emp_Forgot_PasswordotpUseCase(empRepositories);
const newPassword = new postnewpassword_1.Emp_NewPassword(empRepositories);
const putProfieEMployee = new Emp_put_profile_1.Employee_put_Profile_useCase(empRepositories);
const putEmp_job = new emp_put_jobs_1.Employee_put_job_useCase(empRepositories);
const getEmpl_Booking = new Empl_service_booking_1.Employee_Service_Booking_useCase(service_bookingRep);
const putEmpl_Service_booking_status = new put_employee_service_booking_1.Employee_put_Service_booking_useCase(service_bookingRep);
const getEmployee = new getEmployee_1.Employee_get_details_useCase(empRepositories);
const getJobs = new getJobs_1.Admin_get_jobs_useCase(adminjobRepositoies);
const putonDuty = new putonDutyuseCase_1.Emp_putonDutyuseCase(empRepositories);
const addlocation = new putaddlocation_1.Emp_putaddLocationuseCase(empRepositories);
const getreqservice = new getreqservicewithemployeeid_usecase_1.EmpgetReqservice_useCase(reqServiceMechanicsRepositories);
const putreqservice = new put_acceptreqacceptEmployee_1.Accept_reqServiceEmployee(reqServiceMechanicsRepositories);
const getServicePayment = new getPaymentDetails_1.Emp_getPaymentDetails(servce_paymentRepositories);
// chats
const getchatbyEmployeeside = new getchatbyEmployeeid_1.Get_chatbyEmployeeId(chatrepositories);
const getuserDetails = new getUserdetails_usCase_1.User_getdetails(userRepositories);
// trasactions
const gettranasactionByemployee = new getuaserid_1.Transaction_getbyuserId(transactionrepositories);
const putwithrdrawamount = new putwithdrawamount_1.Employee_putwithrdawamountuseCase(walletRepositories, empRepositories, transactionrepositories);
const getwalletEmployee = new getbyemployeeId_1.Employee_getWalletDetails(walletRepositories);
const employeeController = new EmployeeController_1.EmployeeController(createEmployee, sendmailOtp, checkOtp, login, putProfieEMployee, putEmp_job, getEmpl_Booking, putEmpl_Service_booking_status, getEmployee, getJobs, getuserDetails, forgotUserCase, newPassword, putonDuty, addlocation);
const servicecontroller = new EmpServiceController_1.EmpServiceController(getreqservice, putreqservice, getServicePayment, gettranasactionByemployee, putwithrdrawamount, getwalletEmployee);
const chatcontroller = new employeechatcontroller_1.EmployeeChatcontroller(getchatbyEmployeeside);
const router = express_1.default.Router();
router.post("/refresh-token", (req, res) => {
    (0, jwt_auth_token_1.createAccessToken)(req, res, "employee");
});
router.post("/signup", (req, res) => employeeController.Signup(req, res));
router.post("/signup/otp", (req, res) => employeeController.OtpChecking_Employee(req, res));
router.post("/signup/resendotp", (req, res) => employeeController.Signup(req, res));
router.post("/login", (req, res) => employeeController.Emp_logiConroll(req, res));
router.get("/logout", (req, res, next) => employeeController.Employee_get_Logout_controll(req, res, next));
router.post("/forgot-password/otp", (req, res, next) => {
    employeeController.Employee_Post_forgot_password_controll(req, res, next);
});
router.post("/forgot-password/check", (req, res, next) => {
    employeeController.Employee_post_forgot_password_otpcheckcontroll(req, res, next);
});
router.post("/forgot-password", (req, res, next) => {
    employeeController.Employee_post_newpassword(req, res, next);
});
router.get("/jobs", userAuthentication_1.Authentication, (req, res, next) => {
    employeeController.admin_get_Jobs_controll(req, res, next);
});
router.put("/profile/:id", userAuthentication_1.Authentication, (req, res, next) => {
    employeeController.Employee_Put_Profile_Controll(req, res, next);
});
router.put("/job/:id", userAuthentication_1.Authentication, (req, res, next) => {
    employeeController.Employee_put_job_controll(req, res, next);
});
router.get("/service-booking/:id", userAuthentication_1.Authentication, (req, res, next) => employeeController.Employee_get_Service_Booking_controll(req, res, next));
router.put("/service-booking/status/:id", userAuthentication_1.Authentication, (req, res, next) => {
    employeeController.Employee_put_serviceBooking_controll(req, res, next);
});
router.get("/employee/:id", userAuthentication_1.Authentication, (req, res, next) => {
    employeeController.Employee_get_details_controll(req, res, next);
});
router.get("/req-services/:id", userAuthentication_1.Authentication, (req, res, next) => {
    servicecontroller.employee_getReqServiceCntroll(req, res, next);
});
router.put("/req-serivce/acceptemployee/:id", userAuthentication_1.Authentication, (req, res, next) => {
    servicecontroller.employee_putreqServceacceptcntroll(req, res, next);
});
router.get("/service-payment/:id", userAuthentication_1.Authentication, (req, res, next) => {
    servicecontroller.employee_getPaymentDetails(req, res, next);
});
router.get("/chats-employeeid/:id", userAuthentication_1.Authentication, (req, res, next) => {
    chatcontroller.getemployeeChat_employeeid(req, res, next);
});
router.get("/user/:id", userAuthentication_1.Authentication, (req, res, next) => {
    employeeController.Employee_get_userdetailsControl(req, res, next);
});
router.put("/onduty/:id", userAuthentication_1.Authentication, (req, res, next) => {
    console.log(req.params);
    employeeController.Employee_put_onDuty(req, res, next);
});
router.put("/location/:id", userAuthentication_1.Authentication, (req, res, next) => {
    employeeController.Employee_putaddlocation(req, res, next);
});
router.get("/transactions/:id", userAuthentication_1.Authentication, (req, res, next) => {
    servicecontroller.employeeService_getTransacationhistory(req, res, next);
});
router.put("/withdraw/:id", userAuthentication_1.Authentication, (req, res, next) => {
    servicecontroller.employeeService_putWithdrawamountitoWallet(req, res, next);
});
router.get("/wallet/:id", userAuthentication_1.Authentication, (req, res, next) => {
    servicecontroller.employeeService_getWalletdetails(req, res, next);
});
exports.default = router;
