
import { createAccessToken } from "../../interfaces/jwt/jwt_auth_token";
import { Authentication } from "../../interfaces/middleware/userside/userAuthentication";
import express from "express";
import { chatcontroller, employeeController, servicecontroller } from "../dependency_injection/mechanic.di";
const router = express.Router();

router.post("/refresh-token", (req, res) => {
  createAccessToken(req, res, "employee");
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
  employeeController.Employee_post_forgot_password_otpcheckcontroll(
    req,
    res,
    next
  );
});
router.post("/forgot-password", (req, res, next) => {
  employeeController.Employee_post_newpassword(req, res, next);
});

router.get("/jobs", Authentication, (req, res, next) => {
  employeeController.admin_get_Jobs_controll(req, res, next);
});

router.put("/profile/:id", Authentication, (req, res, next) => {
  employeeController.Employee_Put_Profile_Controll(req, res, next);
});
router.put("/job/:id", Authentication, (req, res, next) => {
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

router.put(
  "/req-serivce/acceptemployee/:id",
  Authentication,
  (req, res, next) => {
    servicecontroller.employee_putreqServceacceptcntroll(req, res, next);
  }
);

router.get("/service-payment/:id", Authentication, (req, res, next) => {
  servicecontroller.employee_getPaymentDetails(req, res, next);
});
router.get("/chats-employeeid/:id", Authentication, (req, res, next) => {
  chatcontroller.getemployeeChat_employeeid(req, res, next);
});
router.get("/user/:id", Authentication, (req, res, next) => {
  employeeController.Employee_get_userdetailsControl(req, res, next);
});
router.put("/onduty/:id", Authentication, (req, res, next) => {
  console.log(req.params);

  employeeController.Employee_put_onDuty(req, res, next);
});
router.put("/location/:id", Authentication, (req, res, next) => {
  employeeController.Employee_putaddlocation(req, res, next);
});

router.get("/transactions/:id", Authentication, (req, res, next) => {
  servicecontroller.employeeService_getTransacationhistory(req, res, next);
});
router.put("/withdraw/:id", Authentication, (req, res, next) => {
  servicecontroller.employeeService_putWithdrawamountitoWallet(req, res, next);
});
router.get("/wallet/:id", Authentication, (req, res, next) => {
  servicecontroller.employeeService_getWalletdetails(req, res, next);
});
router.put("/FCM_token/:id", (req, res, next) => {
  employeeController._Employee_put_setFCMToken(req, res, next);
});

export default router;
