import { NextFunction, Request, Response } from "express";
import { AdminLogin } from "../../../use-cases/admin/adminLogin";
import {
  category_Validation,
  loginValidates,
} from "../../../utils/helper/Validation";
import {
  GenerateAccessToken,
  GenerateRefreshToken,
} from "../../jwt/jwt_auth_token";
// import { Admin_add_product_Usecase } from "../../../use-cases/admin/product/Admin_add_product_usecase";
import { Admin_add_Category_useCase } from "../../../use-cases/admin/category/Admin_add_category";
import { Admin_edit_Category_useCase } from "../../../use-cases/admin/category/Admin_edit_categoty";
import { Admin_Del_Category_useCase } from "../../../use-cases/admin/category/admin_del_useCase";
import { Admin_add_jobs_useCase } from "../../../use-cases/admin/jobs/admin_addjobs";
import { Admin_edit_jobs_useCase } from "../../../use-cases/admin/jobs/adminEditJobs";
import { Admin_del_job_useCase } from "../../../use-cases/admin/jobs/del_admin_jobs";
import { Admin_get_allEmployees_useCase } from "../../../use-cases/admin/workerManageMent/get_employees";
import { Admin_put_employee_useCase } from "../../../use-cases/admin/workerManageMent/putEmployees";
import { Admin_del_employee_useCase } from "../../../use-cases/admin/workerManageMent/del_employee_admin";
import { Admin_get_allUsers_useCase } from "../../../use-cases/admin/userMangement/getUsersAdmin";
import { Admin_put_user_useCase } from "../../../use-cases/admin/userMangement/put_userAdmin";
import { admin_Block_UnBlock_User_useCase } from "../../../use-cases/admin/userMangement/del_User_admin";
import { Admin_get_categories_useCase } from "../../../use-cases/admin/category/get_categories_admin";
import { Admin_get_jobs_useCase } from "../../../use-cases/admin/jobs/getJobs";
import { Admin_get_feedbacks_useCase } from "../../../use-cases/admin/feedbacks/get_feedbacks";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { Admin_putfeedBackrefunduseCase } from "../../../use-cases/admin/feedbacks/put_feedbackrefund";

export class AdminController {
  constructor(
    private admiside: AdminLogin,
    private getcategory:Admin_get_categories_useCase,
    private newCategory: Admin_add_Category_useCase,
    private editCategory: Admin_edit_Category_useCase,
    private blockCategory: Admin_Del_Category_useCase,
    private getJobs:Admin_get_jobs_useCase,
    private newJobs: Admin_add_jobs_useCase,
    private editJobs: Admin_edit_jobs_useCase,
    private delJobs: Admin_del_job_useCase,
    private getEmployees: Admin_get_allEmployees_useCase,
    private editEmployee: Admin_put_employee_useCase,
    private delEmployee: Admin_del_employee_useCase,
    private getUserss:Admin_get_allUsers_useCase,
    private putUser:Admin_put_user_useCase,
    private delUser:admin_Block_UnBlock_User_useCase,
    private getfeedbacks:Admin_get_feedbacks_useCase,
    private putfeedbackrefund:Admin_putfeedBackrefunduseCase

     // private newProduct: Admin_add_product_Usecase,
  ) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
       return next(new Error("all field required "));
      }

      const adminData = await this.admiside.execute(email, password);
      console.log("admindadata"+adminData.role);
      
      const refresh_token = GenerateRefreshToken(adminData.id,"admin");
      const access_token = GenerateAccessToken(adminData.id,"admin");
      const getusers = await this.admiside.getAlluser();
      const getEmployees = await this.admiside.getAllEmployees();
      const getJobs = await this.admiside.getAllJobs();
      const getCategories = await this.admiside.getAllCategories();
      const { password: _, ...withoutPassword } = adminData;
      const usersWithoutPassword = getusers.map(
        ({ password, ...rest }) => rest
      );
      const employeeWithoutPassword = getEmployees.map(
        ({ password, ...rest }) => rest
      );

      res
      .cookie("admin_refreshToken", refresh_token, {
        httpOnly: true, // ✅ Prevents JavaScript access for security
        path: "/", // ✅ Ensure the cookie is accessible everywhere
      })
                .status(200)
        .json({ 
          message: "admin logined",
          admin: withoutPassword,
          admintoken: access_token,
          users: usersWithoutPassword,
          employees: employeeWithoutPassword,
          jobs: getJobs,
          categories: getCategories,
        });
    } catch (error: any) {
      console.log("Admin login error", error.message);
      return next(error);
    }
  }

  // async Admin_AddProduct_controller(req: Request, res: Response,next:NextFunction) {
  //   const { name, description, stock, categoryName, price } = req.body;
  //   try {
  //     const images = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];
  //     console.log(images);

  //     const product = await this.newProduct.execute(
  //       name,
  //       description,
  //       stock,
  //       price,
  //       categoryName,
  //       images
  //     );

  //      res.status(201).json({message:'product cretaed',product})
  //      return

  //   } catch (error:any) {
  //     console.log("error -> admin_product",error.message);
  //     res.status(400).json({error:error.message})
  //     return

  //   }
  // }

  async admin_Add_Category_controller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name, description } = req.body;
    console.log(name,description);
    
    category_Validation(name, description, next);

    try {
      const category = await this.newCategory.execute(name, description);
     return res.status(201).json({ message: "catgory created", category });
    } catch (error: any) {
      console.log("error admin->category Controller");

     return next(error);
    }
  }

  async Admin_edit_category_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("category edit controller");

    const { name, description } = req.body;
    category_Validation(name, description, next);
    const { id } = req.params;
    if (!id) {
      console.log("id not comming");

     return next(new Error("Id is Missing"));
    }
    try {
      const category = await this.editCategory.execute(id, name, description);
      return res.status(200).json({ message: "Category Updated", category });
   
    } catch (error: any) {
      console.log("error-> admin_edit_controll", error.message);
      // res.status(400).json({error:error.message})
     return next(error);
    }
  }

  async admin_delete_category_controller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    if (!id) {
      return next(new Error("Id is Missing"));
     
    }
    try {
      const category = await this.blockCategory.execute(id);

      return res.status(200).json({ message: "Success Blocked Category", category });
      
    } catch (error: any) {
      console.log("error -> admin category_del", error.message);

     return next(error);
    }
  }

  async admin_get_Jobs_controll(req:Request,res:Response,next:NextFunction){
    try {


      console.log("get job controller");
      
      const jobs=await this.getJobs.execute()
      return res.status(200).json({message:'success',jobs})
 
      
    } catch (error:any) {
      
      console.log("error-> admin-getjob controller",error.message);
    return  next(error)
      
    }
  }

  async admin_add_Jobs_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name, description, minimum_wage } = req.body;
    if (!name || !description || !minimum_wage) {
      next(new Error("all field is required"));
    }
    try {
      const job = await this.newJobs.execute(name, description, minimum_wage);

      res.status(201).json({ message: "Job created", job });

      return;
    } catch (error: any) {
      next(error);
    }
  }

  async Admin_edit_jobs_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name, description, minimum_wage } = req.body;
    if (!name || !description || !minimum_wage) {
      next(new Error("all field is required"));
    }
    const { id } = req.params;
    if (!id) next(new Error("Id is Missing"));

    try {
      const job = await this.editJobs.execute(
        name,
        description,
        Number(minimum_wage),
        id
      );
      res.status(200).json({ message: "Job edited", job });
    } catch (error) {
      next(error);
    }
  }

  async Admin_del_jobs_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const job = await this.delJobs.execute(id);
      res.status(200).json({ message: "success job blocked | unblocked", job });
    } catch (error: any) {
      console.log("error-> admindel controller");

      next(error);
    }
  }
  async Admin_get_Employees_controll(
    req: Request,
    res: Response,
    next: NextFunction 
  ) {
    try {
      console.log("All Cookies:", req.cookies);

      const employees = await this.getEmployees.execute();
      console.log(req.cookies.admin_refreshToken);

      const withoutPassword = employees.map(({ password, ...rest }) => rest);

      res.status(200).json({ message: "success", employees: withoutPassword });
    } catch (error: any) {
      console.log("error->adminget_Employees controll", error.message);
      next(error);
    }
  }

  async admin_put_employee_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id, username, phone, skills, experience } = req.body;
    if (!id || !username || !phone  || !skills || !experience) {
      next(new Error("field missing "));
    }
    try {
      const employee = await this.editEmployee.execute(
        id,
        username,
        phone,
        skills,
        Number(experience)
      );
      
      const { password: _, ...withoutpassword } = employee;
      res.status(200).json({ message: "success ", employee: withoutpassword });
    } catch (error: any) {
      console.log("error-> admin put employee controller", error.message);

      next(error);
    }
  }
  async admin_Del_employee_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const employee = await this.delEmployee.execute(id);
      const { password: _, ...withoutPassword } = employee;
      res.status(200).json({ message: "success", employee: withoutPassword });
    } catch (error) {
      console.log("error -> admin employee del controller", error);
      next(error);
    }
  }

  async Admin_get_users_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await this.getUserss.execute();
      const withoutPassword = users.map(({ password, ...rest }) => rest);
      res.status(200).json({ message: "success", users: withoutPassword });
    } catch (error: any) {
      console.log("error->adminget_Employees controll", error.message);
      next(error);
    }
  }

  async admin_put_users_controll(req:Request,res:Response,next:NextFunction){

    const { id, username, phone} = req.body;
    if (!id || !username || !phone ) {
      next(new Error("field missing "));
    }
    try {
      const user = await this.putUser.execute(
        id,
        username,
        phone,
    );
      const { password: _, ...withoutpassword } = user;
      res.status(200).json({ message: "success ", user: withoutpassword });
    }catch(error:any)
    {
      console.log("error->admin -> putuser ",error.message);
      next(error)
      

    }


  }
  async admin_Del_User_controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const user = await this.delUser.execute(id);
      const { password: _, ...withoutPassword } = user;
      res.status(200).json({ message: "success", user: withoutPassword });
    } catch (error: any) {
      console.log("error -> admin user del controller", error.message);
      next(error);
    }
  }


  async Admin_get_categories_controll(req:Request,res:Response,next:NextFunction){
    try {
      const categories=await this.getcategory.execute()
      res.status(200).json({message:"success",categories})
    } catch (error:any) {
      console.log("error - > admin Controller getcategory",error.message);
      next(error)
      
      
    }
  }
  async Admin_get_Feedbacks_controll(req:Request,res:Response,next:NextFunction){
    try {
      console.log("feedback");
      
      const feedback=await this.getfeedbacks.execute()
      res.status(200).json({message:"success",feedback})
    } catch (error:any) {
      console.log("error - > admin Controller getfeedbacks",error.message);
      next(error)
      
      
    }
  }
  async Admin_put_FeedbacksRefund_controll(req:Request,res:Response,next:NextFunction){
    try { 
      console.log("feedback");
      const{id}=req.params 
      if(!id) return next(new CustomError("missing id",401,AppError.ValidationError))
      const feedback=await this.putfeedbackrefund.execute(id)
      res.status(200).json({message:"success",feedback})
    } catch (error:any) {
      console.log("error - > admin Controller getfeedbacks",error.message);
      next(error)
      
      
    }
  }

}
