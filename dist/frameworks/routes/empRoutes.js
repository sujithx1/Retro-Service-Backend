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
// repositories
const empRepositories = new EmployeMongoRepositories_1.EmployeeMongoRepositories();
const service_bookingRep = new mongoServiceRepositories_1.Mongo_Service_Booking_Repositories();
const adminjobRepositoies = new mongoJobRepositories_1.Mongo_Job_admin_Repositories();
const reqServiceMechanicsRepositories = new mongoreqservicemechrep_1.MongoReqServiceMechnics();
// usecases
const createEmployee = new createEmploye_1.EmployeeSignup(empRepositories);
const sendmailOtp = new sendotp_1.EmployeeSendOtp(empRepositories);
const checkOtp = new otpchecking_1.CheckOtp();
const login = new Emp_login_1.Emp_Login_useCase(empRepositories);
const putProfieEMployee = new Emp_put_profile_1.Employee_put_Profile_useCase(empRepositories);
const putEmp_job = new emp_put_jobs_1.Employee_put_job_useCase(empRepositories);
const getEmpl_Booking = new Empl_service_booking_1.Employee_Service_Booking_useCase(service_bookingRep);
const putEmpl_Service_booking_status = new put_employee_service_booking_1.Employee_put_Service_booking_useCase(service_bookingRep);
const getEmployee = new getEmployee_1.Employee_get_details_useCase(empRepositories);
const getJobs = new getJobs_1.Admin_get_jobs_useCase(adminjobRepositoies);
const getreqservice = new getreqservicewithemployeeid_usecase_1.EmpgetReqservice_useCase(reqServiceMechanicsRepositories);
const putreqservice = new put_acceptreqacceptEmployee_1.Accept_reqServiceEmployee(reqServiceMechanicsRepositories);
const employeeController = new EmployeeController_1.EmployeeController(createEmployee, sendmailOtp, checkOtp, login, putProfieEMployee, putEmp_job, getEmpl_Booking, putEmpl_Service_booking_status, getEmployee, getJobs);
const servicecontroller = new EmpServiceController_1.EmpServiceController(getreqservice, putreqservice);
const router = express_1.default.Router();
router.post("/refresh-token", (req, res) => {
    (0, jwt_auth_token_1.createAccessToken)(req, res, "employee_resfrehToken");
});
router.post("/signup", (req, res) => employeeController.Signup(req, res));
router.post("/signup/otp", (req, res) => employeeController.OtpChecking_Employee(req, res));
router.post("/signup/resendotp", (req, res) => employeeController.Signup(req, res));
router.post("/login", (req, res) => employeeController.Emp_logiConroll(req, res));
router.get("/logout", (req, res, next) => employeeController.Employee_get_Logout_controll(req, res, next));
router.get('/jobs', userAuthentication_1.Authentication, (req, res, next) => {
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
exports.default = router;
