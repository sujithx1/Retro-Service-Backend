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
exports.EmpServiceController = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
const app_1 = require("../../../app");
class EmpServiceController {
    constructor(getemployeeReqservice, putEmployeeReqservice, getServicePayment, gettranasactionByuser, putwithrdrawamount, getwalletemployee) {
        this.getemployeeReqservice = getemployeeReqservice;
        this.putEmployeeReqservice = putEmployeeReqservice;
        this.getServicePayment = getServicePayment;
        this.gettranasactionByuser = gettranasactionByuser;
        this.putwithrdrawamount = putwithrdrawamount;
        this.getwalletemployee = getwalletemployee;
    }
    employee_getReqServiceCntroll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(" get controller");
                const { id } = req.params;
                if (!id) {
                    return next(new custom_errors_1.CustomError("employee id missing", 401, error_enum_1.AppError.ValidationError));
                }
                const reqService = yield this.getemployeeReqservice.execute(id);
                return res.status(200).json({ message: "success", reqService, succes: true });
            }
            catch (error) {
                console.log("error userlogout", error);
                return next(error);
            }
        });
    }
    employee_putreqServceacceptcntroll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("[put] controller");
                const { id } = req.params;
                const { status, employeeId } = req.body;
                console.log(req.body);
                if (!status || !employeeId) {
                    return next(new custom_errors_1.CustomError("missing fields", 401, error_enum_1.AppError.ValidationError));
                }
                if (!id) {
                    return next(new custom_errors_1.CustomError("id missing", 401, error_enum_1.AppError.ValidationError));
                }
                console.log("emp id", id);
                const reqService = yield this.putEmployeeReqservice.execute(id, employeeId, status);
                app_1.io.emit('confirmBooking', { id });
                return res.status(200).json({ message: "success", reqService, succes: true });
            }
            catch (error) {
                console.log("error userlogout", error);
                return next(error);
            }
        });
    }
    employee_getPaymentDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(" get controller");
                const { id } = req.params;
                if (!id) {
                    return next(new custom_errors_1.CustomError("id missing", 401, error_enum_1.AppError.ValidationError));
                }
                console.log("emp id", id);
                const service = yield this.getServicePayment.execute(id);
                return res.status(200).json({ message: "success", succes: true, service });
            }
            catch (error) {
                console.log("error userlogout", error);
                return next(error);
            }
        });
    }
    employeeService_getTransacationhistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("  transaction controller");
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const transactions = yield this.gettranasactionByuser.execute(id);
                console.log('transactions ', transactions);
                return res.status(200).json({ message: "success", succes: true, transactions });
            }
            catch (error) {
                console.log("error userlogout", error);
                return next(error);
            }
        });
    }
    employeeService_putWithdrawamountitoWallet(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("  transaction controller");
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                const { amount } = req.body;
                if (!amount)
                    return next(new custom_errors_1.CustomError("missing amount", 401, error_enum_1.AppError.ValidationError));
                const wallet = yield this.putwithrdrawamount.execute(id, amount);
                console.log('transactions ');
                return res.status(200).json({ message: "success", succes: true, wallet });
            }
            catch (error) {
                console.log("error userlogout", error);
                return next(error);
            }
        });
    }
    employeeService_getWalletdetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("  transaction controller");
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                const wallet = yield this.getwalletemployee.execute(id);
                return res.status(200).json({ message: "success", succes: true, wallet });
            }
            catch (error) {
                console.log("error userlogout", error);
                return next(error);
            }
        });
    }
}
exports.EmpServiceController = EmpServiceController;
