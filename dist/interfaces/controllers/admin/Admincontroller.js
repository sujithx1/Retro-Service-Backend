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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const Validation_1 = require("../../../utils/helper/Validation");
const jwt_auth_token_1 = require("../../jwt/jwt_auth_token");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class AdminController {
    constructor(admiside, getcategory, newCategory, editCategory, blockCategory, getJobs, newJobs, editJobs, delJobs, getEmployees, editEmployee, delEmployee, getUserss, putUser, delUser, getfeedbacks, putfeedbackrefund, approve_mechanic, getAlltransactions) {
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
        this.putfeedbackrefund = putfeedbackrefund;
        this.approve_mechanic = approve_mechanic;
        this.getAlltransactions = getAlltransactions;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return next(new Error("all field required "));
                }
                const adminData = yield this.admiside.execute(email, password);
                console.log("admindadata" + adminData.role);
                const refresh_token = (0, jwt_auth_token_1.GenerateRefreshToken)(adminData.id, "admin");
                const access_token = (0, jwt_auth_token_1.GenerateAccessToken)(adminData.id, "admin");
                const getusers = yield this.admiside.getAlluser();
                const getEmployees = yield this.admiside.getAllEmployees();
                const getJobs = yield this.admiside.getAllJobs();
                const getCategories = yield this.admiside.getAllCategories();
                res
                    .cookie("admin_refreshToken", refresh_token, {
                    httpOnly: true, // ✅ Prevents JavaScript access for security
                    path: "/", // ✅ Ensure the cookie is accessible everywhere
                })
                    .status(200)
                    .json({
                    message: "admin logined",
                    admin: adminData,
                    admintoken: access_token,
                    users: getusers,
                    employees: getEmployees,
                    jobs: getJobs,
                    categories: getCategories,
                });
            }
            catch (error) {
                // console.log("Admin login error", error.message);
                return next(error);
            }
        });
    }
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
                return res
                    .status(200)
                    .json({ message: "Success Blocked Category", category });
            }
            catch (error) {
                // console.log("error -> admin category_del", error.message);
                return next(error);
            }
        });
    }
    admin_get_Jobs_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("get job controller");
                const jobs = yield this.getJobs.execute();
                return res.status(200).json({ message: "success", jobs });
            }
            catch (error) {
                // console.log("error-> admin-getjob controller",error.message);
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
                return next(error);
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
                return next(error);
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
                console.log("All Cookies:", req.cookies);
                const employees = yield this.getEmployees.execute();
                console.log(req.cookies.admin_refreshToken);
                // const withoutPassword = employees.map(({ password, ...rest }) => rest);
                res.status(200).json({ message: "success", employees });
            }
            catch (error) {
                // console.log("error->adminget_Employees controll", error.message);
                next(error);
            }
        });
    }
    admin_put_employee_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, username, phone, skills, experience } = req.body;
            if (!id || !username || !phone || !skills || !experience) {
                next(new Error("field missing "));
            }
            try {
                const employee = yield this.editEmployee.execute(id, username, phone, skills, Number(experience));
                // const { password: _, ...withoutpassword } = employee;
                res.status(200).json({ message: "success ", employee });
            }
            catch (error) {
                // console.log("error-> admin put employee controller", error.message);
                next(error);
            }
        });
    }
    admin_Del_employee_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const employee = yield this.delEmployee.execute(id);
                // const { password: _, ...withoutPassword } = employee;
                res.status(200).json({ message: "success", employee });
            }
            catch (error) {
                console.log("error -> admin employee del controller", error);
                next(error);
            }
        });
    }
    Admin_get_users_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getUserss.execute();
                // const withoutPassword = users.map(({ password, ...rest }) => rest);
                res.status(200).json({ message: "success", users });
            }
            catch (error) {
                // console.log("error->adminget_Employees controll", error.message);
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
                // const { password: _, ...withoutpassword } = user;
                res.status(200).json({ message: "success ", user });
            }
            catch (error) {
                // console.log("error->admin -> putuser ",error.message);
                next(error);
            }
        });
    }
    admin_Del_User_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield this.delUser.execute(id);
                // const { password: _, ...withoutPassword } = user;
                res.status(200).json({ message: "success", user });
            }
            catch (error) {
                // console.log("error -> admin user del controller", error.message);
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
                // console.log("error - > admin Controller getcategory",error.message);
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
                // console.log("error - > admin Controller getfeedbacks",error.message);
                next(error);
            }
        });
    }
    Admin_put_FeedbacksRefund_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("feedback");
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                const feedback = yield this.putfeedbackrefund.execute(id);
                res.status(200).json({ message: "success", feedback });
            }
            catch (error) {
                next(error);
            }
        });
    }
    Admin_put_approvedMechancic_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                yield this.approve_mechanic.execute(id);
                return res.status(200).json({ message: "success" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    _admingetallTransactions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield this.getAlltransactions.execute();
                return res.status(200).json({ message: "success", transactions });
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
}
exports.AdminController = AdminController;
