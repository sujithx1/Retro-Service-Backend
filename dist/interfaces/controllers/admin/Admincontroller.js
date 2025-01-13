"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const Validation_1 = require("../../../utils/helper/Validation");
const jwt_auth_token_1 = require("../../jwt/jwt_auth_token");
class AdminController {
    constructor(admiside, getcategory, newCategory, editCategory, blockCategory, getJobs, newJobs, editJobs, delJobs, getEmployees, editEmployee, delEmployee, getUserss, putUser, delUser, getfeedbacks
    // private newProduct: Admin_add_product_Usecase,
    ) {
        this.admiside = admiside;
        this.getcategory = getcategory;
        this.newCategory = newCategory;
        this.editCategory = editCategory;
        this.blockCategory = blockCategory;
        this.getJobs = getJobs;
        this.newJobs = newJobs;
        this.editJobs = editJobs;
        this.delJobs = delJobs;
        this.getEmployees = getEmployees;
        this.editEmployee = editEmployee;
        this.delEmployee = delEmployee;
        this.getUserss = getUserss;
        this.putUser = putUser;
        this.delUser = delUser;
        this.getfeedbacks = getfeedbacks;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return next(new Error("all field required "));
                }
                const adminData = yield this.admiside.execute(email, password);
                const refresh_token = (0, jwt_auth_token_1.GenerateRefreshToken)(adminData.id, adminData.role);
                const access_token = (0, jwt_auth_token_1.GenerateAccessToken)(adminData.id, adminData.role);
                const getusers = yield this.admiside.getAlluser();
                const getEmployees = yield this.admiside.getAllEmployees();
                const getJobs = yield this.admiside.getAllJobs();
                const getCategories = yield this.admiside.getAllCategories();
                const { password: _ } = adminData, withoutPassword = __rest(adminData, ["password"]);
                const usersWithoutPassword = getusers.map((_a) => {
                    var { password } = _a, rest = __rest(_a, ["password"]);
                    return rest;
                });
                const employeeWithoutPassword = getEmployees.map((_a) => {
                    var { password } = _a, rest = __rest(_a, ["password"]);
                    return rest;
                });
                return res
                    .cookie("admin_refreshtoken", refresh_token, {
                    httpOnly: true,
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
            }
            catch (error) {
                console.log("Admin login error", error.message);
                return next(error);
            }
        });
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
    admin_Add_Category_controller(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = req.body;
            console.log(name, description);
            (0, Validation_1.category_Validation)(name, description, next);
            try {
                const category = yield this.newCategory.execute(name, description);
                return res.status(201).json({ message: "catgory created", category });
            }
            catch (error) {
                console.log("error admin->category Controller");
                return next(error);
            }
        });
    }
    Admin_edit_category_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("category edit controller");
            const { name, description } = req.body;
            (0, Validation_1.category_Validation)(name, description, next);
            const { id } = req.params;
            if (!id) {
                console.log("id not comming");
                return next(new Error("Id is Missing"));
            }
            try {
                const category = yield this.editCategory.execute(id, name, description);
                return res.status(200).json({ message: "Category Updated", category });
            }
            catch (error) {
                console.log("error-> admin_edit_controll", error.message);
                // res.status(400).json({error:error.message})
                return next(error);
            }
        });
    }
    admin_delete_category_controller(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return next(new Error("Id is Missing"));
            }
            try {
                const category = yield this.blockCategory.execute(id);
                return res.status(200).json({ message: "Success Blocked Category", category });
            }
            catch (error) {
                console.log("error -> admin category_del", error.message);
                return next(error);
            }
        });
    }
    admin_get_Jobs_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("get job controller");
                const jobs = yield this.getJobs.execute();
                return res.status(200).json({ message: 'success', jobs });
            }
            catch (error) {
                console.log("error-> admin-getjob controller", error.message);
                return next(error);
            }
        });
    }
    admin_add_Jobs_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, minimum_wage } = req.body;
            if (!name || !description || !minimum_wage) {
                next(new Error("all field is required"));
            }
            try {
                const job = yield this.newJobs.execute(name, description, minimum_wage);
                res.status(201).json({ message: "Job created", job });
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    Admin_edit_jobs_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, minimum_wage } = req.body;
            if (!name || !description || !minimum_wage) {
                next(new Error("all field is required"));
            }
            const { id } = req.params;
            if (!id)
                next(new Error("Id is Missing"));
            try {
                const job = yield this.editJobs.execute(name, description, Number(minimum_wage), id);
                res.status(200).json({ message: "Job edited", job });
            }
            catch (error) {
                next(error);
            }
        });
    }
    Admin_del_jobs_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const job = yield this.delJobs.execute(id);
                res.status(200).json({ message: "success job blocked | unblocked", job });
            }
            catch (error) {
                console.log("error-> admindel controller");
                next(error);
            }
        });
    }
    Admin_get_Employees_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.getEmployees.execute();
                const withoutPassword = employees.map((_a) => {
                    var { password } = _a, rest = __rest(_a, ["password"]);
                    return rest;
                });
                res.status(200).json({ message: "success", employees: withoutPassword });
            }
            catch (error) {
                console.log("error->adminget_Employees controll", error.message);
                next(error);
            }
        });
    }
    admin_put_employee_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, username, phone, location, skills, experience } = req.body;
            if (!id || !username || !phone || !location || !skills || !experience) {
                next(new Error("field missing "));
            }
            try {
                const employee = yield this.editEmployee.execute(id, username, phone, location, skills, Number(experience));
                const { password: _ } = employee, withoutpassword = __rest(employee, ["password"]);
                res.status(200).json({ message: "success ", employee: withoutpassword });
            }
            catch (error) {
                console.log("error-> admin put employee controller", error.message);
                next(error);
            }
        });
    }
    admin_Del_employee_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const employee = yield this.delEmployee.execute(id);
                const { password: _ } = employee, withoutPassword = __rest(employee, ["password"]);
                res.status(200).json({ message: "success", employee: withoutPassword });
            }
            catch (error) {
                console.log("error -> admin employee del controller", error.message);
                next(error);
            }
        });
    }
    Admin_get_users_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getUserss.execute();
                const withoutPassword = users.map((_a) => {
                    var { password } = _a, rest = __rest(_a, ["password"]);
                    return rest;
                });
                res.status(200).json({ message: "success", users: withoutPassword });
            }
            catch (error) {
                console.log("error->adminget_Employees controll", error.message);
                next(error);
            }
        });
    }
    admin_put_users_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, username, phone } = req.body;
            if (!id || !username || !phone) {
                next(new Error("field missing "));
            }
            try {
                const user = yield this.putUser.execute(id, username, phone);
                const { password: _ } = user, withoutpassword = __rest(user, ["password"]);
                res.status(200).json({ message: "success ", user: withoutpassword });
            }
            catch (error) {
                console.log("error->admin -> putuser ", error.message);
                next(error);
            }
        });
    }
    admin_Del_User_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield this.delUser.execute(id);
                const { password: _ } = user, withoutPassword = __rest(user, ["password"]);
                res.status(200).json({ message: "success", user: withoutPassword });
            }
            catch (error) {
                console.log("error -> admin user del controller", error.message);
                next(error);
            }
        });
    }
    Admin_get_categories_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.getcategory.execute();
                res.status(200).json({ message: "success", categories });
            }
            catch (error) {
                console.log("error - > admin Controller getcategory", error.message);
                next(error);
            }
        });
    }
    Admin_get_Feedbacks_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("feedback");
                const feedback = yield this.getfeedbacks.execute();
                res.status(200).json({ message: "success", feedback });
            }
            catch (error) {
                console.log("error - > admin Controller getfeedbacks", error.message);
                next(error);
            }
        });
    }
}
exports.AdminController = AdminController;
