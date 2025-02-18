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
exports.UserServiceRazorpayPayment = void 0;
const servicePaymentEntities_1 = require("../../../entities/servicePaymentEntities");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
const transactionEntities_1 = require("../../../entities/transactionEntities");
class UserServiceRazorpayPayment {
    constructor(paymentRepositories, employeeRepositories, serviceRepositories, walletrepositories, transactionrepositories) {
        this.paymentRepositories = paymentRepositories;
        this.employeeRepositories = employeeRepositories;
        this.serviceRepositories = serviceRepositories;
        this.walletrepositories = walletrepositories;
        this.transactionrepositories = transactionrepositories;
    }
    execute(name, vehicleNumber, problem, phone, amount, employeeId, userId, jobName, serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPayment = new servicePaymentEntities_1.ServicePaymentEntity("", userId, employeeId, serviceId, 0, { name,
                phone,
                problem,
                vehicleNumber
            }, "CONFIRMED", "", jobName);
            const adminwallet = yield this.walletrepositories.findByAdmin();
            if (!adminwallet)
                throw new custom_errors_1.CustomError("adminwallet not Found", 401, error_enum_1.AppError.ResourceNotFound);
            const updateadminwallet = yield this.walletrepositories.findByIdandUpdate(adminwallet);
            if (!updateadminwallet)
                throw new custom_errors_1.CustomError("wallet not update", 401, error_enum_1.AppError.ServerError);
            const Servicepayment = yield this.paymentRepositories.create(newPayment);
            const employee = yield this.employeeRepositories.findById(employeeId);
            if (!employee)
                throw new custom_errors_1.CustomError("employee not Found", 401, error_enum_1.AppError.UserNotFound);
            const service = yield this.serviceRepositories.findbyId(serviceId);
            if (!service)
                throw new custom_errors_1.CustomError("Service Not Found", 401, error_enum_1.AppError.ResourceNotFound);
            service.status = "CONFIRMED";
            service.paymentId = Servicepayment.id;
            yield this.serviceRepositories.findByIdAndUpdate(service, employeeId);
            yield this.employeeRepositories.findIdAndUpdateRevenue(employee.id, Servicepayment.amount);
            const transaction = new transactionEntities_1.TransactionEntities("", Servicepayment.userId, "advancepay", 100, "complete", "razorypay", "service");
            yield this.transactionrepositories.create(transaction);
            return Servicepayment;
        });
    }
}
exports.UserServiceRazorpayPayment = UserServiceRazorpayPayment;
