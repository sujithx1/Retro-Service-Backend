import express from "express";
import { createAccessToken } from "../../interfaces/jwt/jwt_auth_token";
import { admincontroller } from "../dependency_injection/admin.di";
import { Authentication } from "../../interfaces/middleware/userside/userAuthentication";

const router = express.Router();


router.post("/refresh-token", (req, res) => {
  createAccessToken(req, res,"admin");
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

router.put('/report-feedback/:id',
  Authentication,
  (req,res,next)=>{
    console.log("calling feedback");
    
  admincontroller.Admin_put_FeedbacksRefund_controll(req,res,next)
})

export default router;
