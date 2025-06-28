"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_auth_token_1 = require("../../interfaces/jwt/jwt_auth_token");
const admin_di_1 = require("../dependency_injection/admin.di");
const userAuthentication_1 = require("../../interfaces/middleware/userside/userAuthentication");
const user_di_1 = require("../dependency_injection/user.di");
const router = express_1.default.Router();
router.post("/refresh-token", (req, res) => {
    (0, jwt_auth_token_1.createAccessToken)(req, res, "admin");
});
router.post("/login", (req, res, next) => {
    admin_di_1.admincontroller.login(req, res, next);
});
router.get("/categories", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.Admin_get_categories_controll(req, res, next);
});
router.post("/category", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.admin_Add_Category_controller(req, res, next);
});
router.put("/category/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.Admin_edit_category_controll(req, res, next);
});
router.delete("/category/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.admin_delete_category_controller(req, res, next);
});
router.get("/users", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.Admin_get_users_controll(req, res, next);
});
router.put("/user", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.admin_put_users_controll(req, res, next);
});
router.delete("/user/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.admin_Del_User_controll(req, res, next);
});
router.get("/employees", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.Admin_get_Employees_controll(req, res, next);
});
router.put("/employee", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.admin_put_employee_controll(req, res, next);
});
router.delete("/employee/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.admin_Del_employee_controll(req, res, next);
});
router.get("/jobs", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.admin_get_Jobs_controll(req, res, next);
});
router.post("/job", (req, res, next) => {
    (0, userAuthentication_1.Authentication)(req, res, next);
    admin_di_1.admincontroller.admin_add_Jobs_controll(req, res, next);
});
router.put("/job/:id", (req, res, next) => {
    (0, userAuthentication_1.Authentication)(req, res, next);
    admin_di_1.admincontroller.Admin_edit_jobs_controll(req, res, next);
});
router.delete("/job/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.Admin_del_jobs_controll(req, res, next);
});
router.get("/report-feedback", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.Admin_get_Feedbacks_controll(req, res, next);
});
router.put("/report-feedback/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.Admin_put_FeedbacksRefund_controll(req, res, next);
});
router.put("/approve-mechanic/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.Admin_put_approvedMechancic_controll(req, res, next);
});
router.get("/service-booking/:id", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.serviceController._admingetBookingDetail(req, res, next);
});
router.get("/wallet", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.userWalletController.admin_getwalletbyAdminId_controller(req, res, next);
});
router.get("/transactions", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller._admingetallTransactions(req, res, next);
});
exports.default = router;
