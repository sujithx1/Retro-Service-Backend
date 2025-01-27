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
exports.UserServiceController = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
const razorpay_1 = __importDefault(require("razorpay"));
class UserServiceController {
    constructor(createrewservicesmech, getreqServiceUsecase, createServicepayment, getbookingHistory, putReqserviceuseCase, getServicePayment, getsrachjobsUser) {
        this.createrewservicesmech = createrewservicesmech;
        this.getreqServiceUsecase = getreqServiceUsecase;
        this.createServicepayment = createServicepayment;
        this.getbookingHistory = getbookingHistory;
        this.putReqserviceuseCase = putReqserviceuseCase;
        this.getServicePayment = getServicePayment;
        this.getsrachjobsUser = getsrachjobsUser;
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
                const { name, vehicleNumber, problem, phone, amount, employeeId, userId, jobName, serviceId } = req.body;
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
                console.log(req.body);
                const servicepayment = yield this.createServicepayment.execute(name, vehicleNumber, problem, phone, Number(amount), employeeId, userId, jobName, serviceId);
                return res
                    .status(201)
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
                const query = req.query.query;
                console.log("service search", query);
                if (!query)
                    return next(new custom_errors_1.CustomError("Missing quary", 401, error_enum_1.AppError.ValidationError));
                const jobs = yield this.getsrachjobsUser.execute(query);
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
}
exports.UserServiceController = UserServiceController;
