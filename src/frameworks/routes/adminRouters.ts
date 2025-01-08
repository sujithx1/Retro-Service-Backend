import { AdminController } from "../../interfaces/controllers/Admincontroller";
import { MongoAdminRepositories } from "../../interfaces/repositories/admin/Mongo_adminRepositories";
import { UserMongodbRepositories } from "../../interfaces/repositories/userSide/UserMongoRepositories";
import { Admin_add_Category_useCase } from "../../use-cases/admin/category/Admin_add_category";
import { Admin_add_product_Usecase } from "../../use-cases/admin/product/Admin_add_product_usecase";
import { Admin_edit_Category_useCase } from "../../use-cases/admin/category/Admin_edit_categoty";
import { AdminLogin } from "../../use-cases/admin/adminLogin";
import express from "express";
import { Admin_Del_Category_useCase } from "../../use-cases/admin/category/admin_del_useCase";
import { Mongo_catgoriesRepositories } from "../../interfaces/repositories/admin/categories/mongo_categoriesRepositories";
import { Mongo_Job_admin_Repositories } from "../../interfaces/repositories/admin/jobs/mongoJobRepositories";
import { Mongo_Product_adminrepositories } from "../../interfaces/repositories/admin/product/mongo_productRepositories";
import { Admin_add_jobs_useCase } from "../../use-cases/admin/jobs/admin_addjobs";
import { Admin_edit_jobs_useCase } from "../../use-cases/admin/jobs/adminEditJobs";
import { Admin_del_job_useCase } from "../../use-cases/admin/jobs/del_admin_jobs";
import { Admin_get_allEmployees_useCase } from "../../use-cases/admin/workerManageMent/get_employees";
import { Mongo_Admin_Employees_Repositories } from "../../interfaces/repositories/admin/employees/Mongo_Empl_repositories";
import { Admin_put_employee_useCase } from "../../use-cases/admin/workerManageMent/putEmployees";
import { Admin_del_employee_useCase } from "../../use-cases/admin/workerManageMent/del_employee_admin";
import { Mongo_admin_user_Repositories } from "../../interfaces/repositories/admin/user/mongo_userRepositories";
import { Admin_get_allUsers_useCase } from "../../use-cases/admin/userMangement/getUsersAdmin";
import { Admin_put_user_useCase } from "../../use-cases/admin/userMangement/put_userAdmin";
import { admin_Block_UnBlock_User_useCase } from "../../use-cases/admin/userMangement/del_User_admin";
import { Admin_get_categories_useCase } from "../../use-cases/admin/category/get_categories_admin";
import { Admin_get_jobs_useCase } from "../../use-cases/admin/jobs/getJobs";
import { Authentication } from "../../interfaces/middleware/userside/userAuthentication";
import { Admin_get_feedbacks_useCase } from "../../use-cases/admin/feedbacks/get_feedbacks";
import { Report_FeedBack_user_MongoRepositories } from "../../interfaces/repositories/userSide/feed-back-employee/FeedBack_mongo_Repositories";
import { createAccessToken } from "../../interfaces/jwt/jwt_auth_token";

const adminrepositories = new MongoAdminRepositories();
const categoriesRepositories = new Mongo_catgoriesRepositories();
const jobRepositories = new Mongo_Job_admin_Repositories();
const productRepositories = new Mongo_Product_adminrepositories();
const adminEmplrepositories = new Mongo_Admin_Employees_Repositories();
const admin_userRepositories = new Mongo_admin_user_Repositories();
const feedBack_repositories=new Report_FeedBack_user_MongoRepositories()


const adminlogin = new AdminLogin(adminrepositories);
const adminaddCategory = new Admin_add_Category_useCase(categoriesRepositories);
// const adminAddproduct=new Admin_add_product_Usecase(productRepositories)

const admingetCategories = new Admin_get_categories_useCase(
  categoriesRepositories
);
const adminEditCategory = new Admin_edit_Category_useCase(
  categoriesRepositories
);
const adminDeleteCategory = new Admin_Del_Category_useCase(
  categoriesRepositories
);

const getjobs = new Admin_get_jobs_useCase(jobRepositories);
const addJob = new Admin_add_jobs_useCase(jobRepositories);
const editjob = new Admin_edit_jobs_useCase(jobRepositories);
const deljob = new Admin_del_job_useCase(jobRepositories);

const getallEmpl = new Admin_get_allEmployees_useCase(adminEmplrepositories);
const editEmploye = new Admin_put_employee_useCase(adminEmplrepositories);
const delEmployee = new Admin_del_employee_useCase(adminEmplrepositories);

const getAllUsers = new Admin_get_allUsers_useCase(admin_userRepositories);
const putuser = new Admin_put_user_useCase(admin_userRepositories);
const deluser = new admin_Block_UnBlock_User_useCase(admin_userRepositories);



const getFeedbacks=new Admin_get_feedbacks_useCase(feedBack_repositories)

const admincontroller = new AdminController(
  adminlogin,
  admingetCategories,
  adminaddCategory,
  adminEditCategory,
  adminDeleteCategory,
  getjobs,
  addJob,
  editjob,
  deljob,
  getallEmpl,
  editEmploye,
  delEmployee,
  getAllUsers,
  putuser,
  deluser,
  getFeedbacks
);

const router = express.Router();


router.post("/refresh-token", (req, res) => {
  createAccessToken(req, res,"employee_resfrehToken");
});

router.post("/login", (req, res, next) =>{
  admincontroller.login(req, res, next)}
);
router.get("/categories", 
  Authentication,
  (req, res, next) => {
  admincontroller.Admin_get_categories_controll(req, res, next);
});
router.post("/category", 
  Authentication,
  (req, res, next) =>{
  
  admincontroller.admin_Add_Category_controller(req, res, next)}
);
router.put("/category/:id", 
  Authentication,
  (req, res, next) =>{

  admincontroller.Admin_edit_category_controll(req, res, next)}
);
router.delete("/category/:id", 
  Authentication,
  (req, res, next) =>{

  admincontroller.admin_delete_category_controller(req, res, next)}
);

router.get("/users", 
  Authentication,
  (req, res, next) =>{

  admincontroller.Admin_get_users_controll(req, res, next)}
);
router.put("/user", 
  Authentication,
  (req, res, next) =>{

  admincontroller.admin_put_users_controll(req, res, next)}
);
router.delete("/user/:id", 
  Authentication,
  (req, res, next) =>{

  admincontroller.admin_Del_User_controll(req, res, next)}
);

router.get("/employees",
  Authentication,
   (req, res, next) =>{  

  admincontroller.Admin_get_Employees_controll(req, res, next)}
);
router.put("/employee", 
  Authentication,
  (req, res, next) =>{

  admincontroller.admin_put_employee_controll(req, res, next)}
);
router.delete("/employee/:id", 
  Authentication,
  (req, res, next) =>{

  admincontroller.admin_Del_employee_controll(req, res, next)}
);

router.get("/jobs", 
  Authentication,
  (req, res, next) =>{

  admincontroller.admin_get_Jobs_controll(req, res, next)}
);
router.post("/job", (req, res, next) =>{
  Authentication(req, res, next);

  admincontroller.admin_add_Jobs_controll(req, res, next)}
);
router.put("/job/:id", (req, res, next) =>{
  Authentication(req, res, next);

  admincontroller.Admin_edit_jobs_controll(req, res, next)}
);
router.delete("/job/:id",
  Authentication,
   (req, res, next) =>{

  admincontroller.Admin_del_jobs_controll(req, res, next)}
);


router.get('/report-feedback',
  Authentication,
  (req,res,next)=>{
    console.log("calling feedback");
    
  admincontroller.Admin_get_Feedbacks_controll(req,res,next)
})

export default router;
