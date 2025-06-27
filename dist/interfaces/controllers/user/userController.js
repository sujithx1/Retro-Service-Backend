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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usercontroller = void 0;
// import { SendOtp } from "../../use-cases/userside/SendOtp"
const otp_1 = require("../../../utils/otp");
const Validation_1 = require("../../../utils/helper/Validation");
const redis_1 = __importDefault(require("../../../utils/helper/redis"));
const jwt_auth_token_1 = require("../../jwt/jwt_auth_token");
const cloudinary_1 = __importDefault(require("../../../utils/helper/cloudinary"));
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class Usercontroller {
    constructor(createUser, sendMails, checkOtp, loginUser, AuthService, putUser, putProfileImage, getAlljobs, getAllEmployees, postServiceBooking, getEmployee_serviceBooking, postUser_report_feedback, postforgot_passwordservice, newPassworduseCase, userlocationUsecase, user_getemployeeDetails) {
        this.createUser = createUser;
        this.sendMails = sendMails;
        this.checkOtp = checkOtp;
        this.loginUser = loginUser;
        this.AuthService = AuthService;
        this.putUser = putUser;
        this.putProfileImage = putProfileImage;
        this.getAlljobs = getAlljobs;
        this.getAllEmployees = getAllEmployees;
        this.postServiceBooking = postServiceBooking;
        this.getEmployee_serviceBooking = getEmployee_serviceBooking;
        this.postUser_report_feedback = postUser_report_feedback;
        this.postforgot_passwordservice = postforgot_passwordservice;
        this.newPassworduseCase = newPassworduseCase;
        this.userlocationUsecase = userlocationUsecase;
        this.user_getemployeeDetails = user_getemployeeDetails;
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, phone, password } = req.body;
                const userData = { username, email, phone, password };
                (0, Validation_1.UserValidation)({ username, email, phone, password });
                const otp = (0, otp_1.generate_otp)();
                console.log("otp", otp);
                yield this.sendMails.exicute(email, username, otp);
                yield redis_1.default.setEx("otp", 60, JSON.stringify(otp));
                yield redis_1.default.setEx("userData", 60, JSON.stringify(userData));
                res.status(200).json({ message: "Enter Otp check your Email" });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    OtpChecking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp } = req.body;
                console.log("otp checking", otp);
                if (!otp)
                    throw new Error("Enter Otp");
                console.log(otp);
                const storedOtp = yield redis_1.default.get("otp");
                if (!storedOtp)
                    throw new Error("OTP expired ");
                const otpvalidate = yield this.checkOtp.execute(Number(otp), Number(storedOtp));
                if (!otpvalidate)
                    throw new Error("Invalid OTP");
                yield redis_1.default.del("otp");
                console.log(yield redis_1.default.get("otp"));
                console.log(otpvalidate);
                const userData = yield redis_1.default.get("userData");
                console.log(userData);
                if (!userData)
                    throw new Error("userData Not found ");
                const userDetails = JSON.parse(userData);
                const user = yield this.createUser.exicute(userDetails);
                // const { password: _, ...withoutPassword } = user;
                res
                    .status(201)
                    .json({ mesage: "user registerd ", user });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    userlogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("login render");
                const { email, password } = req.body;
                (0, Validation_1.loginValidates)(email, password);
                const user = yield this.loginUser.execute(email, password);
                const refresh_token = (0, jwt_auth_token_1.GenerateRefreshToken)(user.id, user.role);
                const access_token = (0, jwt_auth_token_1.GenerateAccessToken)(user.id, user.role);
                // const { password: _, isAdmin, ...withoutpassword } = user;
                console.log("user log in success");
                res
                    .cookie("user_refreshToken", refresh_token, {
                    httpOnly: true,
                })
                    .status(200)
                    .json({
                    message: "login success",
                    token: access_token,
                    user,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    User_Google_Auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("google Signin");
                const { credential } = req.body;
                console.log(credential);
                const user = yield this.AuthService.execute(credential);
                const refresh_token = (0, jwt_auth_token_1.GenerateRefreshToken)(user.id, user.role);
                const access_token = (0, jwt_auth_token_1.GenerateAccessToken)(user.id, user.role);
                // const { password, isAdmin, ...without } = user;
                console.log("tokenssss    " + access_token, refresh_token);
                res
                    .cookie("user_refreshToken", refresh_token, {
                    httpOnly: true,
                })
                    .status(200)
                    .json({ message: "login success", user, token: access_token });
            }
            catch (error) {
                next(error);
            }
        });
    }
    User_get_Logout_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.cookies.user_refreshToken;
                if (userToken)
                    res.clearCookie("user_refreshToken");
                res.status(200).json({ message: "success logout" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    User_Put_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { username, phone, profilePic } = req.body;
                const { id } = req.params;
                // Validate inputs
                if (!username || !phone) {
                    return next(new Error("Required fields are missing"));
                }
                else if (!id) {
                    return next(new Error("User ID is required"));
                }
                else if (!profilePic) {
                    return next(new Error("Profile picture is missing"));
                }
                else {
                    console.log("Username and phone:", username, phone);
                    // Cloudinary upload
                    const cloudinaryUpload = yield cloudinary_1.default.uploader.upload(profilePic, {
                        folder: "/profilePic",
                    });
                    console.log("Cloudinary upload successful:", cloudinaryUpload);
                    const user = yield this.putUser.execute(id, username, phone, cloudinaryUpload.secure_url);
                    console.log("Updated user:", user);
                    // const { password: _, ...withoutPassword } = user;
                    console.log("heyyyy");
                    // Send success response
                    return res.status(200).json({
                        message: "User updated successfully",
                        user,
                    });
                }
            }
            catch (error) {
                return next(error);
            }
        });
    }
    User_put_image_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("imag controller");
                const { id } = req.params;
                if (!id) {
                    return next(new Error("id not found"));
                }
                // const profile_pic=req.file?req.file.filename:null
                // if(!profile_pic) return next(new Error("Image Not Found"))
                //   console.log("profile pic",profile_pic);
                if (!req.file) {
                    return next(new Error("file not upload"));
                }
                const localFilePath = req.file.filename; // File path from local upload
                console.log("locaalpath", localFilePath);
                const userProfile = yield this.putProfileImage.execute(id, localFilePath);
                console.log(userProfile + "userrrrrrrrrrrrrrrrrrrrr");
                return res.status(200).json({ message: "image updated", user: userProfile });
            }
            catch (error) {
                next(error);
            }
        });
    }
    user_get_allJobs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield this.getAlljobs.execute();
                res.status(200).json({ message: "success", jobs: jobs });
            }
            catch (error) {
                next(error);
            }
        });
    }
    user_get_allEmplooyees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.getAllEmployees.execute();
                // const withoutPassword = employees.map(({ password, ...rest }) => rest);
                res.status(200).json({ message: "success", employees });
            }
            catch (error) {
                next(error);
            }
        });
    }
    user_post_service_Booking_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, userName, userEmail, problem, userLocation, employeeId, employeeName, empLocation, jobId, jobName, ServiceMin_wage, } = req.body;
                console.log(req.body);
                if (!userId ||
                    !userName ||
                    !userEmail ||
                    !problem ||
                    !userLocation ||
                    !employeeId ||
                    !employeeName ||
                    !empLocation ||
                    !jobId ||
                    !jobName ||
                    !ServiceMin_wage) {
                    return next(new Error("All fields Required.."));
                }
                const booking = yield this.postServiceBooking.execute(userId, employeeId, jobId, userLocation, Number(ServiceMin_wage), problem);
                return res.status(201).json({ message: "success", service: booking });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    User_get_service_Booking_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new Error("Id is missing"));
                const service = yield this.getEmployee_serviceBooking.execute(id);
                return res.status(200).json({ message: "success", service });
            }
            catch (error) {
                console.log("err->User_get_service_Booking_controll", error);
                return next(error);
            }
        });
    }
    User_post_report_feedBack_employee_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, feedback, employeeId, type, amount, rating, bookingId } = req.body;
                console.log(req.body);
                if (!userId || !feedback || !employeeId || !type || !rating || !bookingId)
                    return next(new custom_errors_1.CustomError(" missing Feild", 401, error_enum_1.AppError.ValidationError));
                const feedBack = yield this.postUser_report_feedback.execute(userId, employeeId, feedback, Number(rating), type, Number(amount), bookingId);
                return res.status(201).json({ message: "success", feedBack });
            }
            catch (error) {
                console.log("err->User_get_service_Booking_controll", error);
                return next(error);
            }
        });
    }
    User_Post_forgot_password_controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                console.log("forgot password", email);
                yield this.postforgot_passwordservice.execute(email);
                res.status(200).json({ message: "check Your Email", email });
            }
            catch (error) {
                console.log("err->User_get_service_Booking_controll", error);
                return next(error);
            }
        });
    }
    user_post_forgot_password_otpcheckcontroll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp } = req.body;
                if (!otp)
                    throw new custom_errors_1.CustomError("missig filed", 401, error_enum_1.AppError.ValidationError);
                console.log(otp);
                const storedOtp = yield redis_1.default.get("forgot-password-otp");
                if (!storedOtp)
                    throw new custom_errors_1.CustomError("OTP expired", 401, error_enum_1.AppError.OtpExpired);
                yield this.checkOtp.execute(Number(otp), Number(storedOtp));
                res.status(200).json({ message: "change your password" });
            }
            catch (error) {
                console.log("err->User_get_service_Booking_controll", error);
                return next(error);
            }
        });
    }
    user_post_newpassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password)
                    throw new custom_errors_1.CustomError("missig filed", 401, error_enum_1.AppError.ValidationError);
                console.log(email, password);
                yield this.newPassworduseCase.execute(email, password);
                res.status(200).json({ message: "success", success: true });
            }
            catch (error) {
                console.log("err->User_get_service_Booking_controll", error);
                return next(error);
            }
        });
    }
    user_putaddlocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log("body", req.body);
                const { lat, lng, address } = req.body;
                if (!id)
                    return new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError);
                if (!lat || !lng || !address)
                    return new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError);
                const location = yield this.userlocationUsecase.execute(id, lat, lng, address);
                res.status(200).json({ message: "success", success: true, location });
            }
            catch (error) {
                console.log("err->User_get_service_Booking_controll", error);
                return next(error);
            }
        });
    }
    User_get_employeedetailsControl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("id missing", 401, error_enum_1.AppError.ValidationError));
                const user = yield this.user_getemployeeDetails.execute(id);
                return res.status(200).json({ message: "success", user });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.Usercontroller = Usercontroller;
