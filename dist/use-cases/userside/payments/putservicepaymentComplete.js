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
exports.User_CompleteServiceBooking_payment = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
const transactionEntities_1 = require("../../../entities/transactionEntities");
class User_CompleteServiceBooking_payment {
    constructor(paymentRepositories, employeeRepositories, serviceRepositories, transactionrepositories) {
        this.paymentRepositories = paymentRepositories;
        this.employeeRepositories = employeeRepositories;
        this.serviceRepositories = serviceRepositories;
        this.transactionrepositories = transactionrepositories;
    }
    execute(id, vehicleNumber, phone, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const Servicepayment = yield this.paymentRepositories.findById(id);
            if (!Servicepayment)
                throw new custom_errors_1.CustomError("servicePayment not found", 401, error_enum_1.AppError.ResourceNotFound);
            Servicepayment.serviceDetails.phone = phone;
            Servicepayment.serviceDetails.vehicleNumber = vehicleNumber;
            Servicepayment.amount = amount;
            Servicepayment.status = "COMPLETED";
            const update = yield this.paymentRepositories.findByIdAndUpdate(Servicepayment);
            if (!update)
                throw new custom_errors_1.CustomError("payment not updated", 401, error_enum_1.AppError.ServerError);
            const employee = yield this.employeeRepositories.findById(Servicepayment.employeeId);
            if (!employee)
                throw new custom_errors_1.CustomError("employee not Found", 401, error_enum_1.AppError.UserNotFound);
            const service = yield this.serviceRepositories.findbyId(Servicepayment.serviceId);
            if (!service)
                throw new custom_errors_1.CustomError("Service Not Found", 401, error_enum_1.AppError.ResourceNotFound);
            service.status = "COMPLETED";
            service.paymentId = Servicepayment.id;
            yield this.serviceRepositories.findByIdAndUpdate(service, employee.id);
            yield this.employeeRepositories.findIdAndUpdateRevenue(employee.id, Servicepayment.amount);
            const usertransaction = new transactionEntities_1.TransactionEntities("", Servicepayment.userId, "payment", Number(amount), "complete", "razorpay", "service");
            yield this.transactionrepositories.create(usertransaction);
            const emptransaction = new transactionEntities_1.TransactionEntities("", Servicepayment.employeeId, "credited", Number(amount), "complete", "razorpay", "service");
            yield this.transactionrepositories.create(emptransaction);
            return Servicepayment;
        });
    }
}
exports.User_CompleteServiceBooking_payment = User_CompleteServiceBooking_payment;
