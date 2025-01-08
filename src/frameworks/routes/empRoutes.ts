import { EmployeeController } from "../../interfaces/controllers/EmployeeController";
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

const empRepositories = new EmployeeMongoRepositories();
const service_bookingRep = new Mongo_Service_Booking_Repositories();
const adminjobRepositoies=new Mongo_Job_admin_Repositories()

const createEmployee = new EmployeeSignup(empRepositories);
const sendmailOtp = new EmployeeSendOtp(empRepositories);
const checkOtp = new CheckOtp();
const login = new Emp_Login_useCase(empRepositories);
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
  getJobs
);
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




export default router;
