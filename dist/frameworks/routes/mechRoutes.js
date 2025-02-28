"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_auth_token_1 = require("../../interfaces/jwt/jwt_auth_token");
const userAuthentication_1 = require("../../interfaces/middleware/userside/userAuthentication");
const express_1 = __importDefault(require("express"));
const mechanic_di_1 = require("../dependency_injection/mechanic.di");
const router = express_1.default.Router();
router.post("/refresh-token", (req, res) => {
    (0, jwt_auth_token_1.createAccessToken)(req, res, "employee");
});
router.post("/signup", (req, res) => mechanic_di_1.employeeController.Signup(req, res));
router.post("/signup/otp", (req, res) => mechanic_di_1.employeeController.OtpChecking_Employee(req, res));
router.post("/signup/resendotp", (req, res) => mechanic_di_1.employeeController.Signup(req, res));
router.post("/login", (req, res) => mechanic_di_1.employeeController.Emp_logiConroll(req, res));
router.get("/logout", (req, res, next) => mechanic_di_1.employeeController.Employee_get_Logout_controll(req, res, next));
router.post("/forgot-password/otp", (req, res, next) => {
    mechanic_di_1.employeeController.Employee_Post_forgot_password_controll(req, res, next);
});
router.post("/forgot-password/check", (req, res, next) => {
    mechanic_di_1.employeeController.Employee_post_forgot_password_otpcheckcontroll(req, res, next);
});
router.post("/forgot-password", (req, res, next) => {
    mechanic_di_1.employeeController.Employee_post_newpassword(req, res, next);
});
router.get("/jobs", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.employeeController.admin_get_Jobs_controll(req, res, next);
});
router.put("/profile/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.employeeController.Employee_Put_Profile_Controll(req, res, next);
});
router.put("/job/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.employeeController.Employee_put_job_controll(req, res, next);
});
router.get("/service-booking/:id", userAuthentication_1.Authentication, (req, res, next) => mechanic_di_1.employeeController.Employee_get_Service_Booking_controll(req, res, next));
router.put("/service-booking/status/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.employeeController.Employee_put_serviceBooking_controll(req, res, next);
});
router.get("/employee/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.employeeController.Employee_get_details_controll(req, res, next);
});
router.get("/req-services/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.servicecontroller.employee_getReqServiceCntroll(req, res, next);
});
router.put("/req-serivce/acceptemployee/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.servicecontroller.employee_putreqServceacceptcntroll(req, res, next);
});
router.get("/service-payment/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.servicecontroller.employee_getPaymentDetails(req, res, next);
});
router.get("/chats-employeeid/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.chatcontroller.getemployeeChat_employeeid(req, res, next);
});
router.get("/user/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.employeeController.Employee_get_userdetailsControl(req, res, next);
});
router.put("/onduty/:id", userAuthentication_1.Authentication, (req, res, next) => {
    console.log(req.params);
    mechanic_di_1.employeeController.Employee_put_onDuty(req, res, next);
});
router.put("/location/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.employeeController.Employee_putaddlocation(req, res, next);
});
router.get("/transactions/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.servicecontroller.employeeService_getTransacationhistory(req, res, next);
});
router.put("/withdraw/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.servicecontroller.employeeService_putWithdrawamountitoWallet(req, res, next);
});
router.get("/wallet/:id", userAuthentication_1.Authentication, (req, res, next) => {
    mechanic_di_1.servicecontroller.employeeService_getWalletdetails(req, res, next);
});
exports.default = router;
