"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Admincontroller_1 = require("../../interfaces/controllers/Admincontroller");
const Mongo_adminRepositories_1 = require("../../interfaces/repositories/admin/Mongo_adminRepositories");
const Admin_add_category_1 = require("../../use-cases/admin/category/Admin_add_category");
const Admin_edit_categoty_1 = require("../../use-cases/admin/category/Admin_edit_categoty");
const adminLogin_1 = require("../../use-cases/admin/adminLogin");
const express_1 = __importDefault(require("express"));
const admin_del_useCase_1 = require("../../use-cases/admin/category/admin_del_useCase");
const mongo_categoriesRepositories_1 = require("../../interfaces/repositories/admin/categories/mongo_categoriesRepositories");
const mongoJobRepositories_1 = require("../../interfaces/repositories/admin/jobs/mongoJobRepositories");
const mongo_productRepositories_1 = require("../../interfaces/repositories/admin/product/mongo_productRepositories");
const admin_addjobs_1 = require("../../use-cases/admin/jobs/admin_addjobs");
const adminEditJobs_1 = require("../../use-cases/admin/jobs/adminEditJobs");
const del_admin_jobs_1 = require("../../use-cases/admin/jobs/del_admin_jobs");
const get_employees_1 = require("../../use-cases/admin/workerManageMent/get_employees");
const Mongo_Empl_repositories_1 = require("../../interfaces/repositories/admin/employees/Mongo_Empl_repositories");
const putEmployees_1 = require("../../use-cases/admin/workerManageMent/putEmployees");
const del_employee_admin_1 = require("../../use-cases/admin/workerManageMent/del_employee_admin");
const mongo_userRepositories_1 = require("../../interfaces/repositories/admin/user/mongo_userRepositories");
const getUsersAdmin_1 = require("../../use-cases/admin/userMangement/getUsersAdmin");
const put_userAdmin_1 = require("../../use-cases/admin/userMangement/put_userAdmin");
const del_User_admin_1 = require("../../use-cases/admin/userMangement/del_User_admin");
const get_categories_admin_1 = require("../../use-cases/admin/category/get_categories_admin");
const getJobs_1 = require("../../use-cases/admin/jobs/getJobs");
const userAuthentication_1 = require("../../interfaces/middleware/userside/userAuthentication");
const get_feedbacks_1 = require("../../use-cases/admin/feedbacks/get_feedbacks");
const FeedBack_mongo_Repositories_1 = require("../../interfaces/repositories/userSide/feed-back-employee/FeedBack_mongo_Repositories");
const jwt_auth_token_1 = require("../../interfaces/jwt/jwt_auth_token");
const adminrepositories = new Mongo_adminRepositories_1.MongoAdminRepositories();
const categoriesRepositories = new mongo_categoriesRepositories_1.Mongo_catgoriesRepositories();
const jobRepositories = new mongoJobRepositories_1.Mongo_Job_admin_Repositories();
const productRepositories = new mongo_productRepositories_1.Mongo_Product_adminrepositories();
const adminEmplrepositories = new Mongo_Empl_repositories_1.Mongo_Admin_Employees_Repositories();
const admin_userRepositories = new mongo_userRepositories_1.Mongo_admin_user_Repositories();
const feedBack_repositories = new FeedBack_mongo_Repositories_1.Report_FeedBack_user_MongoRepositories();
const adminlogin = new adminLogin_1.AdminLogin(adminrepositories);
const adminaddCategory = new Admin_add_category_1.Admin_add_Category_useCase(categoriesRepositories);
// const adminAddproduct=new Admin_add_product_Usecase(productRepositories)
const admingetCategories = new get_categories_admin_1.Admin_get_categories_useCase(categoriesRepositories);
const adminEditCategory = new Admin_edit_categoty_1.Admin_edit_Category_useCase(categoriesRepositories);
const adminDeleteCategory = new admin_del_useCase_1.Admin_Del_Category_useCase(categoriesRepositories);
const getjobs = new getJobs_1.Admin_get_jobs_useCase(jobRepositories);
const addJob = new admin_addjobs_1.Admin_add_jobs_useCase(jobRepositories);
const editjob = new adminEditJobs_1.Admin_edit_jobs_useCase(jobRepositories);
const deljob = new del_admin_jobs_1.Admin_del_job_useCase(jobRepositories);
const getallEmpl = new get_employees_1.Admin_get_allEmployees_useCase(adminEmplrepositories);
const editEmploye = new putEmployees_1.Admin_put_employee_useCase(adminEmplrepositories);
const delEmployee = new del_employee_admin_1.Admin_del_employee_useCase(adminEmplrepositories);
const getAllUsers = new getUsersAdmin_1.Admin_get_allUsers_useCase(admin_userRepositories);
const putuser = new put_userAdmin_1.Admin_put_user_useCase(admin_userRepositories);
const deluser = new del_User_admin_1.admin_Block_UnBlock_User_useCase(admin_userRepositories);
const getFeedbacks = new get_feedbacks_1.Admin_get_feedbacks_useCase(feedBack_repositories);
const admincontroller = new Admincontroller_1.AdminController(adminlogin, admingetCategories, adminaddCategory, adminEditCategory, adminDeleteCategory, getjobs, addJob, editjob, deljob, getallEmpl, editEmploye, delEmployee, getAllUsers, putuser, deluser, getFeedbacks);
const router = express_1.default.Router();
router.post("/refresh-token", (req, res) => {
    (0, jwt_auth_token_1.createAccessToken)(req, res, "employee_resfrehToken");
});
router.post("/login", (req, res, next) => {
    admincontroller.login(req, res, next);
});
router.get("/categories", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.Admin_get_categories_controll(req, res, next);
});
router.post("/category", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.admin_Add_Category_controller(req, res, next);
});
router.put("/category/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.Admin_edit_category_controll(req, res, next);
});
router.delete("/category/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.admin_delete_category_controller(req, res, next);
});
router.get("/users", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.Admin_get_users_controll(req, res, next);
});
router.put("/user", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.admin_put_users_controll(req, res, next);
});
router.delete("/user/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.admin_Del_User_controll(req, res, next);
});
router.get("/employees", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.Admin_get_Employees_controll(req, res, next);
});
router.put("/employee", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.admin_put_employee_controll(req, res, next);
});
router.delete("/employee/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.admin_Del_employee_controll(req, res, next);
});
router.get("/jobs", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.admin_get_Jobs_controll(req, res, next);
});
router.post("/job", (req, res, next) => {
    (0, userAuthentication_1.Authentication)(req, res, next);
    admincontroller.admin_add_Jobs_controll(req, res, next);
});
router.put("/job/:id", (req, res, next) => {
    (0, userAuthentication_1.Authentication)(req, res, next);
    admincontroller.Admin_edit_jobs_controll(req, res, next);
});
router.delete("/job/:id", userAuthentication_1.Authentication, (req, res, next) => {
    admincontroller.Admin_del_jobs_controll(req, res, next);
});
router.get('/report-feedback', userAuthentication_1.Authentication, (req, res, next) => {
    console.log("calling feedback");
    admincontroller.Admin_get_Feedbacks_controll(req, res, next);
});
exports.default = router;
