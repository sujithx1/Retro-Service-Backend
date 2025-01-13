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
class UserServiceRazorpayPayment {
    constructor(paymentRepositories, employeeRepositories, serviceRepositories) {
        this.paymentRepositories = paymentRepositories;
        this.employeeRepositories = employeeRepositories;
        this.serviceRepositories = serviceRepositories;
    }
    execute(name, vehicleNumber, problem, phone, amount, employeeId, userId, jobName, serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPayment = new servicePaymentEntities_1.ServicePaymentEntity("", userId, employeeId, serviceId, amount, "INR", "receipt#1", { name,
                phone,
                problem,
                vehicleNumber
            }, "COMPLETED", "", jobName);
            const Servicepayment = yield this.paymentRepositories.create(newPayment);
            const employee = yield this.employeeRepositories.findById(employeeId);
            if (!employee)
                throw new custom_errors_1.CustomError("employee not Found", 401, error_enum_1.AppError.UserNotFound);
            const service = yield this.serviceRepositories.findbyId(serviceId);
            if (!service)
                throw new custom_errors_1.CustomError("Service Not Found", 401, error_enum_1.AppError.ResourceNotFound);
            service.status = "COMPLETED";
            yield this.serviceRepositories.findByIdAndUpdate(service, employeeId);
            yield this.employeeRepositories.findIdAndUpdateRevenue(employee.id, Servicepayment.amount);
            return Servicepayment;
        });
    }
}
exports.UserServiceRazorpayPayment = UserServiceRazorpayPayment;
