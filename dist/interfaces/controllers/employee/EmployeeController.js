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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const Validation_1 = require("../../../utils/helper/Validation");
const otp_1 = require("../../../utils/otp");
const redis_1 = __importDefault(require("../../../utils/helper/redis"));
const jwt_auth_token_1 = require("../../jwt/jwt_auth_token");
const cloudinary_1 = __importDefault(require("../../../utils/helper/cloudinary"));
class EmployeeController {
    constructor(createEmploye, sendOtp, otpcheking, loginemp, putProfile, putEMp_job, getEmpl_Bopoking, putEmpl_serviceBooking_status, getEmployee, getJobs) {
        this.createEmploye = createEmploye;
        this.sendOtp = sendOtp;
        this.otpcheking = otpcheking;
        this.loginemp = loginemp;
        this.putProfile = putProfile;
        this.putEMp_job = putEMp_job;
        this.getEmpl_Bopoking = getEmpl_Bopoking;
        this.putEmpl_serviceBooking_status = putEmpl_serviceBooking_status;
        this.getEmployee = getEmployee;
        this.getJobs = getJobs;
    }
    Signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, phone, password, skills, experience } = req.body;
                const employeData = {
                    username,
                    email,
                    phone,
                    password,
                    skills,
                    experience,
                };
                (0, Validation_1.EmployeeSignupValidate)(employeData);
                const otp = (0, otp_1.generate_otp)();
                yield this.sendOtp.execute(email, username, otp);
                yield redis_1.default.setEx("empotp", 60, JSON.stringify(otp));
                yield redis_1.default.setEx("empData", 60, JSON.stringify(employeData));
                res.status(200).json({ message: "check your Mail" });
            }
            catch (error) {
                console.log("error employe Signup cntroll", error.message);
                res.status(400).json({ error: error.message });
            }
        });
    }
    OtpChecking_Employee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { otp } = req.body;
            console.log("otp checking", otp);
            try {
                if (!otp)
                    throw new Error("Enter Otp");
                console.log(otp);
                const storedOtp = yield redis_1.default.get("empotp");
                console.log(storedOtp);
                if (!storedOtp)
                    throw new Error("OTP expired ");
                const otpvalidate = yield this.otpcheking.execute(Number(otp), Number(storedOtp));
                if (!otpvalidate)
                    throw new Error("Invalid OTP");
                yield redis_1.default.del("empotp");
                console.log(yield redis_1.default.get("empotp"));
                console.log(otpvalidate);
                const employeData = yield redis_1.default.get("empData");
                console.log(employeData);
                if (!employeData)
                    throw new Error("employeData Not found ");
                const employeDetail = JSON.parse(employeData);
                const employee = yield this.createEmploye.execute(employeDetail);
                const { password: _ } = employee, withoutpassword = __rest(employee, ["password"]);
                res
                    .status(201)
                    .json({ message: "Employee Created", employe: withoutpassword });
            }
            catch (error) {
                console.log("otp checking controller emp", error.message);
                res.status(400).json({ error: error.message });
            }
        });
    }
    Emp_logiConroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log("emp_login controller call");
            try {
                const employee = yield this.loginemp.execute(email, password);
                const refresh_token = (0, jwt_auth_token_1.GenerateRefreshToken)(employee.id, employee.role);
                const access_token = (0, jwt_auth_token_1.GenerateAccessToken)(employee.id, employee.role);
                const { password: _ } = employee, withoutpassword = __rest(employee, ["password"]);
                res
                    .cookie("employee_resfrehToken", refresh_token, {
                    httpOnly: true,
                })
                    .status(200)
                    .json({
                    message: "Employee login success",
                    employee: withoutpassword,
                    token: access_token,
                });
            }
            catch (error) {
                console.log("login controller err", error.message);
                res.status(400).json({ error: error.message });
            }
        });
    }
    Employee_Put_Profile_Controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { username, phone, profilePic, location, experience } = req.body;
                const { id } = req.params;
                // Validate inputs
                if (!username || !phone || !location || !experience) {
                    return next(new Error("Required fields are missing"));
                }
                if (!id) {
                    return next(new Error("User ID is required"));
                }
                if (!profilePic) {
                    return next(new Error("Profile picture is missing"));
                }
                console.log("Username and phone:", username, phone);
                // Cloudinary upload
                const cloudinaryUpload = yield cloudinary_1.default.uploader.upload(profilePic, {
                    folder: "/employee-profilePic",
                });
                console.log("Cloudinary upload successful:", cloudinaryUpload);
                const user = yield this.putProfile.execute(id, username, phone, cloudinaryUpload.secure_url, Number(experience), location);
                console.log("Updated user:", user);
                const { password: _ } = user, withoutPassword = __rest(user, ["password"]);
                console.log("heyyyy");
                // Send success response
                return res.status(200).json({
                    message: "employee updated successfully",
                    employee: withoutPassword,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    Employee_get_Logout_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.cookies.employee_refreshToken;
                if (userToken)
                    res.clearCookie("employee_refreshToken");
                res.status(200).json({ message: "success logout" });
            }
            catch (error) {
                console.log("error userlogout", error.message);
                next(error);
            }
        });
    }
    Employee_put_job_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jobAdd } = req.body;
                console.log(jobAdd);
                if (!jobAdd) {
                    return next(new Error("required field"));
                }
                const { id } = req.params;
                if (!id)
                    return next(new Error("Missing  id"));
                const putJob = yield this.putEMp_job.execute(id, jobAdd.name);
                const { password: _ } = putJob, withoutPass = __rest(putJob, ["password"]);
                return res.status(200).json({
                    message: "success edited Employee Job ",
                    employee: withoutPass,
                });
            }
            catch (error) {
                console.log("error put job ", error.message);
                next(error);
            }
        });
    }
    Employee_get_Service_Booking_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("empl get controller");
                const { id } = req.params;
                if (!id) {
                    return next(new Error("id missing"));
                }
                const services = yield this.getEmpl_Bopoking.execute(id);
                console.log(services);
                res.status(200).json({ message: "success", services });
            }
            catch (error) {
                console.log("error userlogout", error.message);
                return next(error);
            }
        });
    }
    Employee_put_serviceBooking_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new Error("id is Required"));
                const { status } = req.body;
                console.log(req.body);
                if (!status)
                    return next(new Error("Status is required"));
                const service = yield this.putEmpl_serviceBooking_status.execute(id, status);
                return res.status(200).json({ message: "success", service });
            }
            catch (error) {
                console.log("err-> Employee_put_serviceBooking_controll", error);
                return next(error);
            }
        });
    }
    Employee_get_details_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new Error("id missing"));
                const employe = yield this.getEmployee.execute(id);
                const { password: _ } = employe, without = __rest(employe, ["password"]);
                return res.status(200).json({ message: "success", employee: without });
            }
            catch (error) { }
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
                console.log("error-> admin-getjob controller", error.message);
                return next(error);
            }
        });
    }
}
exports.EmployeeController = EmployeeController;
