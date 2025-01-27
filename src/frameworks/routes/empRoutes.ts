import { EmployeeController } from "../../interfaces/controllers/employee/EmployeeController";
import { createAccessToken } from "../../interfaces/jwt/jwt_auth_token";
import { Authentication } from "../../interfaces/middleware/userside/userAuthentication";
import { Mongo_Job_admin_Repositories } from "../../interfaces/repositories/admin/jobs/mongoJobRepositories";
import { EmployeeMongoRepositories } from "../../interfaces/repositories/employeeside/EmployeMongoRepositories";
import { Mongo_Service_Booking_Repositories } from "../../interfaces/repositories/servicebooking/mongoServiceRepositories";
import { Admin_get_jobs_useCase } from "../../use-cases/admin/jobs/getJobs";
import { EmployeeSignup } from "../../use-cases/employeeside/createEmploye";
import { Employee_put_Profile_useCase } from "../../use-cases/employeeside/edit/Emp_put_profile";
import { Emp_Login_useCase } from "../../use-cases/employeeside/Emp_login";
import { Employee_get_details_useCase } from "../../use-cases/employeeside/getEmployee";
import { Employee_put_job_useCase } from "../../use-cases/employeeside/putJobs/emp_put_jobs";
import { EmployeeSendOtp } from "../../use-cases/employeeside/sendotp";
import { Employee_Service_Booking_useCase } from "../../use-cases/employeeside/service_booking/Empl_service_booking";
import { Employee_put_Service_booking_useCase } from "../../use-cases/employeeside/service_booking/put_employee_service_booking";
import { CheckOtp } from "../../use-cases/userside/auth/otpchecking";
import express from "express";
import { EmpgetReqservice_useCase } from "../../use-cases/userside/service/getreqservicewithemployeeid.usecase";
import { EmpServiceController } from "../../interfaces/controllers/employee/EmpServiceController";
import { MongoReqServiceMechnics } from "../../interfaces/repositories/reqservicemechanics/mongoreqservicemechrep";
import { Accept_reqServiceEmployee } from "../../use-cases/employeeside/service_booking/put_acceptreqacceptEmployee";
import { ServicePaymentMongoRepositories } from "../../interfaces/repositories/payments/mongoservicePaymentRepositories";
import { Emp_getPaymentDetails } from "../../use-cases/employeeside/payment/getPaymentDetails";
import { EmployeeChatcontroller } from "../../interfaces/controllers/employee/employeechatcontroller";
import { Message_mongoRepositories } from "../../interfaces/repositories/chats/MongoChatsReposotories";
import { Get_chatbyEmployeeId } from "../../use-cases/chat/getchatbyEmployeeid";
import { User_getdetails } from "../../use-cases/userside/auth/getUserdetails.usCase";
import { UserMongodbRepositories } from "../../interfaces/repositories/userSide/UserMongoRepositories";
import { Emp_Forgot_PasswordotpUseCase } from "../../use-cases/employeeside/forgotpassword";
import { Emp_NewPassword } from "../../use-cases/employeeside/postnewpassword";


// repositories
const empRepositories = new EmployeeMongoRepositories();
const service_bookingRep = new Mongo_Service_Booking_Repositories();
const adminjobRepositoies=new Mongo_Job_admin_Repositories()
const reqServiceMechanicsRepositories=new MongoReqServiceMechnics()
const servce_paymentRepositories=new ServicePaymentMongoRepositories()
const chatrepositories=new Message_mongoRepositories()
const userRepositories=new UserMongodbRepositories()


// usecases
const createEmployee = new EmployeeSignup(empRepositories);
const sendmailOtp = new EmployeeSendOtp(empRepositories);
const checkOtp = new CheckOtp();
const login = new Emp_Login_useCase(empRepositories);

const forgotUserCase = new Emp_Forgot_PasswordotpUseCase(empRepositories);
const newPassword = new Emp_NewPassword(empRepositories);

const putProfieEMployee = new Employee_put_Profile_useCase(empRepositories);
const putEmp_job = new Employee_put_job_useCase(empRepositories);
const getEmpl_Booking = new Employee_Service_Booking_useCase(
  service_bookingRep
);
const putEmpl_Service_booking_status = new Employee_put_Service_booking_useCase(
  service_bookingRep
);
const getEmployee=new Employee_get_details_useCase(empRepositories)
const getJobs=new Admin_get_jobs_useCase(adminjobRepositoies)


const getreqservice=new EmpgetReqservice_useCase(reqServiceMechanicsRepositories)
const putreqservice=new Accept_reqServiceEmployee(reqServiceMechanicsRepositories)


const getServicePayment=new Emp_getPaymentDetails(servce_paymentRepositories)


// chats
const getchatbyEmployeeside=new Get_chatbyEmployeeId(chatrepositories)
const getuserDetails=new User_getdetails(userRepositories)


const employeeController = new EmployeeController(
  createEmployee,
  sendmailOtp,
  checkOtp,
  login,
  putProfieEMployee,
  putEmp_job,
  getEmpl_Booking,
  putEmpl_Service_booking_status,
  getEmployee,
  getJobs,
  getuserDetails,
  forgotUserCase,
  newPassword
);


const servicecontroller=new EmpServiceController(getreqservice,putreqservice,getServicePayment)

const chatcontroller=new EmployeeChatcontroller(getchatbyEmployeeside)


const router = express.Router();

  router.post("/refresh-token", (req, res) => {
    createAccessToken(req, res,"employee_resfrehToken");
  });

router.post("/signup", (req, res) => employeeController.Signup(req, res));
router.post("/signup/otp", (req, res) =>
  employeeController.OtpChecking_Employee(req, res)
);
router.post("/signup/resendotp", (req, res) =>
  employeeController.Signup(req, res)
);
router.post("/login", (req, res) =>
  employeeController.Emp_logiConroll(req, res)
);
router.get("/logout", (req, res, next) =>
  employeeController.Employee_get_Logout_controll(req, res, next)
);



router.post("/forgot-password/otp", (req, res, next) => {
  employeeController.Employee_Post_forgot_password_controll(req, res, next);
});
router.post("/forgot-password/check", (req, res, next) => {
  employeeController.Employee_post_forgot_password_otpcheckcontroll(req, res, next);
});
router.post("/forgot-password", (req, res, next) => {
  employeeController.Employee_post_newpassword(req, res, next);
});



router.get('/jobs',Authentication,(req,res,next)=>{
  employeeController.admin_get_Jobs_controll(req,res,next)

  
})

router.put("/profile/:id", Authentication, (req, res, next) => {
  employeeController.Employee_Put_Profile_Controll(req, res, next);
});
router.put("/job/:id",
  Authentication,
   (req, res, next) => {
  employeeController.Employee_put_job_controll(req, res, next);
});

router.get("/service-booking/:id", Authentication, (req, res, next) =>
  employeeController.Employee_get_Service_Booking_controll(req, res, next)
);

router.put("/service-booking/status/:id", Authentication, (req, res, next) => {
  employeeController.Employee_put_serviceBooking_controll(req, res, next);
});



router.get("/employee/:id", Authentication, (req, res, next) => {
  employeeController.Employee_get_details_controll(req, res, next);
});

router.get("/req-services/:id", Authentication, (req, res, next) => {
  servicecontroller.employee_getReqServiceCntroll(req, res, next);
});

router.put("/req-serivce/acceptemployee/:id", Authentication, (req, res, next) => {
  servicecontroller.employee_putreqServceacceptcntroll(req, res, next);
});

router.get("/service-payment/:id", Authentication, (req, res, next) => {
  servicecontroller.employee_getPaymentDetails(req, res, next);
});
router.get("/chats-employeeid/:id", Authentication, (req, res, next) => {
  chatcontroller.getemployeeChat_employeeid(req, res, next);
});
router.get("/user/:id", Authentication, (req, res, next) => {
  employeeController.Employee_get_userdetailsControl(req,res,next)
});






export default router;
