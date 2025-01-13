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
exports.ServicePaymentMongoRepositories = void 0;
const servicePaymentEntities_1 = require("../../../entities/servicePaymentEntities");
const servicePayment_model_1 = require("../../../frameworks/db/models/servicePayment_model");
class ServicePaymentMongoRepositories {
    create(service) {
        return __awaiter(this, void 0, void 0, function* () {
            const servicepayment = yield servicePayment_model_1.ServicePaymentModel.create(service);
            return new servicePaymentEntities_1.ServicePaymentEntity(servicepayment.id, servicepayment.userId.toString(), servicepayment.employeeId.toString(), servicepayment.serviceId.toString(), servicepayment.amount, servicepayment.currency, servicepayment.receipt, servicepayment.serviceDetails, servicepayment.status, servicepayment.paymentId, servicepayment.jobName, servicepayment.createdAt, servicepayment.updatedAt);
        });
    }
    findByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield servicePayment_model_1.ServicePaymentModel.find({ userId: id });
            if (!booking.length)
                return [];
            return booking.map((service) => new servicePaymentEntities_1.ServicePaymentEntity(service.id, service.userId.toString(), service.employeeId.toString(), service.serviceId.toString(), service.amount, service.currency, service.receipt, service.serviceDetails, service.status, service.paymentId, service.jobName, service.createdAt, service.updatedAt));
        });
    }
}
exports.ServicePaymentMongoRepositories = ServicePaymentMongoRepositories;
