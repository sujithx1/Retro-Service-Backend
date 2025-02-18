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
exports.UserServiceController = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
const razorpay_1 = __importDefault(require("razorpay"));
const cronjobReject_1 = require("../../../utils/helper/db_helper/cronjobReject");
const cronjobCancelling_1 = require("../../../utils/helper/db_helper/cronjobCancelling");
const app_1 = require("../../../app");
class UserServiceController {
    constructor(createrewservicesmech, getreqServiceUsecase, putServicepaymentComplete, getbookingHistory, putReqserviceuseCase, getServicePayment, getsrachjobsUser, getNearestEmployees, putserviceSpecificemp, createServicePayment, gettranasactionByuser) {
        this.createrewservicesmech = createrewservicesmech;
        this.getreqServiceUsecase = getreqServiceUsecase;
        this.putServicepaymentComplete = putServicepaymentComplete;
        this.getbookingHistory = getbookingHistory;
        this.putReqserviceuseCase = putReqserviceuseCase;
        this.getServicePayment = getServicePayment;
        this.getsrachjobsUser = getsrachjobsUser;
        this.getNearestEmployees = getNearestEmployees;
        this.putserviceSpecificemp = putserviceSpecificemp;
        this.createServicePayment = createServicePayment;
        this.gettranasactionByuser = gettranasactionByuser;
    }
    reqserviceEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, userName, userEmail, userLocation, jobId, jobName, Min_wage, problem, } = req.body;
                if (!userId ||
                    !userName ||
                    !userEmail ||
                    !userLocation ||
                    !jobId ||
                    !jobName ||
                    !Min_wage ||
                    !problem) {
                    return next(new custom_errors_1.CustomError("missing filed", 401, error_enum_1.AppError.ValidationError));
                }
                console.log(userId, userName, userEmail, userLocation, jobId, jobName, Min_wage, problem);
                const reqService = yield this.createrewservicesmech.execute(userId, userEmail, userName, userLocation, jobId, jobName, Min_wage, problem);
                console.log(reqService);
                (0, cronjobReject_1.startBookingCronJob)();
                if (reqService.mechanics.length == 0)
                    app_1.io.emit("bookingFailed", { id: reqService.id });
                return res
                    .status(201)
                    .json({ message: "success", succes: true, reqService: reqService });
            }
            catch (error) {
                console.log("reqserviceEmployee error", error);
                return next(error);
            }
        });
    }
    get_reqServicecontrolle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get reqservice controller");
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                const reqService = yield this.getreqServiceUsecase.execute(id);
                return res
                    .status(200)
                    .json({ message: "success", succes: true, reqService });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    userServiceRazorpaypayment_Controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, currency, receipt } = req.body;
                if (!amount || !currency || !receipt)
                    return next(new custom_errors_1.CustomError("Missing fields", 401, error_enum_1.AppError.ValidationError));
                const razorpay = new razorpay_1.default({
                    key_id: process.env.RAZORPAYID || "",
                    key_secret: process.env.RAZORPAYSECRECT,
                });
                const order = yield razorpay.orders.create({
                    amount: amount * 100, // Amount in paise
                    currency: currency,
                    receipt: receipt,
                });
                return res.json(order);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    userServiceRazorpaypayment_Confirm_Controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("ctroll");
                const { id } = req.params;
                const { vehicleNumber, phone, amount, } = req.body;
                if (!vehicleNumber ||
                    !phone ||
                    !amount)
                    return next(new custom_errors_1.CustomError("Missing fields", 401, error_enum_1.AppError.ValidationError));
                if (!id)
                    return next(new custom_errors_1.CustomError("Missing Id", 401, error_enum_1.AppError.ValidationError));
                console.log(req.body);
                const servicepayment = yield this.putServicepaymentComplete.execute(id, vehicleNumber, phone, Number(amount));
                return res
                    .status(200)
                    .json({ message: "succes", success: true, servicepayment });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    userService_Bookin_history_Controll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log("service booking-hsitory", id);
                if (!id)
                    return next(new custom_errors_1.CustomError("Missing field", 401, error_enum_1.AppError.ValidationError));
                const history = yield this.getbookingHistory.execute(id);
                return res
                    .status(200)
                    .json({ message: "success", success: true, history });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    userService_PutReqservecontroll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status } = req.body;
                if (!id)
                    return next(new custom_errors_1.CustomError("Missing field", 401, error_enum_1.AppError.ValidationError));
                if (!status)
                    return next(new custom_errors_1.CustomError("Missing status", 401, error_enum_1.AppError.ValidationError));
                const service = yield this.putReqserviceuseCase.execute(id, status);
                return res
                    .status(200)
                    .json({ message: "success", success: true, service });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    userService_GETservicePayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log("service booking-hsitory", id);
                if (!id)
                    return next(new custom_errors_1.CustomError("Missing field", 401, error_enum_1.AppError.ValidationError));
                const service = yield this.getServicePayment.execute(id);
                console.log("service payment", service);
                return res
                    .status(200)
                    .json({ message: "success", success: true, service });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    userService_GETsearch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("serach controller");
                const searchQuery = req.query.search || ""; // Get 'search' query parameter
                console.log("service search", searchQuery);
                // if (!searchQuery)
                //   return next(
                //     new CustomError("Missing quary", 401, AppError.ValidationError)
                //   );
                const jobs = yield this.getsrachjobsUser.execute(searchQuery);
                // console.log("service payment",service);
                return res
                    .status(200)
                    .json({ message: "success", success: true, services: jobs });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    userService_GETNearestEmployees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("nearest employees controller");
                const lat = parseFloat(req.query.lat);
                const lng = parseFloat(req.query.lng);
                if (isNaN(lat) || isNaN(lng))
                    return new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError);
                const employees = yield this.getNearestEmployees.execute(lat, lng);
                console.log(employees[0]);
                const employeesWithoutPassword = employees.map((employee) => {
                    const { password } = employee, employeeWithoutPassword = __rest(employee, ["password"]);
                    return employeeWithoutPassword;
                });
                return res
                    .status(200)
                    .json({
                    message: "success",
                    success: true,
                    employees: employeesWithoutPassword,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    userService_putreqserviceSpesificEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("putservice send on specific emp");
                const { id } = req.params;
                const { emplId } = req.body;
                console.log(id, emplId);
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                if (!emplId)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                (0, cronjobCancelling_1.startBookingCronJob3min)();
                const service = yield this.putserviceSpecificemp.execute(id, emplId);
                return res
                    .status(200)
                    .json({
                    message: "success",
                    success: true,
                    service
                });
            }
            catch (error) {
                console.log("error user put contrroll", error);
                return next(error);
            }
        });
    }
    userService_postAdvancePayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, vehicleNumber, problem, phone, amount, employeeId, userId, jobName, serviceId, } = req.body;
                if (!name ||
                    !vehicleNumber ||
                    !problem ||
                    !phone ||
                    !amount ||
                    !employeeId ||
                    !userId ||
                    !jobName ||
                    !serviceId)
                    return next(new custom_errors_1.CustomError("Missing fields", 401, error_enum_1.AppError.ValidationError));
                const servicepayment = yield this.createServicePayment.execute(name, vehicleNumber, problem, phone, Number(amount), employeeId, userId, jobName, serviceId);
                return res
                    .status(201)
                    .json({ message: "succes", success: true, servicepayment });
            }
            catch (error) {
                console.log("error user put contrroll", error);
                return next(error);
            }
        });
    }
    userService_getTransacationhistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("transactions");
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const transactions = yield this.gettranasactionByuser.execute(id);
                console.log('transactions ', transactions);
                res.status(200).json({ message: 'success', success: true, transactions });
            }
            catch (error) {
                console.log("error user put contrroll", error);
                return next(error);
            }
        });
    }
}
exports.UserServiceController = UserServiceController;
