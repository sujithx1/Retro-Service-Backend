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
            var _a, _b, _c;
            const servicepayment = yield servicePayment_model_1.ServicePaymentModel.create(service);
            return new servicePaymentEntities_1.ServicePaymentEntity(servicepayment.id, ((_a = servicepayment.userId) === null || _a === void 0 ? void 0 : _a.toString()) || '', ((_b = servicepayment.employeeId) === null || _b === void 0 ? void 0 : _b.toString()) || '', ((_c = servicepayment.serviceId) === null || _c === void 0 ? void 0 : _c.toString()) || '', servicepayment.amount, servicepayment.serviceDetails, servicepayment.status, servicepayment.paymentId, servicepayment.jobName, servicepayment.createdAt, servicepayment.updatedAt);
        });
    }
    findByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            const bookings = yield servicePayment_model_1.ServicePaymentModel.find({ userId: id });
            if (!bookings.length)
                return [];
            return bookings.map(service => {
                var _a, _b, _c;
                return new servicePaymentEntities_1.ServicePaymentEntity(service.id, ((_a = service.userId) === null || _a === void 0 ? void 0 : _a.toString()) || '', ((_b = service.employeeId) === null || _b === void 0 ? void 0 : _b.toString()) || '', ((_c = service.serviceId) === null || _c === void 0 ? void 0 : _c.toString()) || '', service.amount, service.serviceDetails, service.status, service.paymentId, service.jobName, service.createdAt, service.updatedAt);
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const service = yield servicePayment_model_1.ServicePaymentModel.findById(id);
            if (!service)
                return null;
            return new servicePaymentEntities_1.ServicePaymentEntity(service.id, ((_a = service.userId) === null || _a === void 0 ? void 0 : _a.toString()) || '', ((_b = service.employeeId) === null || _b === void 0 ? void 0 : _b.toString()) || '', ((_c = service.serviceId) === null || _c === void 0 ? void 0 : _c.toString()) || '', service.amount, service.serviceDetails, service.status, service.paymentId, service.jobName, service.createdAt, service.updatedAt);
        });
    }
    findByIdAndUpdate(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const service = yield servicePayment_model_1.ServicePaymentModel.findByIdAndUpdate(payment.id, {
                status: payment.status,
                paymentId: payment.paymentId,
                amount: payment.amount,
                'serviceDetails.phone': payment.serviceDetails.phone,
                'serviceDetails.vehicleNumber': payment.serviceDetails.vehicleNumber
            }, { new: true, upsert: true });
            if (!service)
                return null;
            return new servicePaymentEntities_1.ServicePaymentEntity(service.id, ((_a = service.userId) === null || _a === void 0 ? void 0 : _a.toString()) || '', ((_b = service.employeeId) === null || _b === void 0 ? void 0 : _b.toString()) || '', ((_c = service.serviceId) === null || _c === void 0 ? void 0 : _c.toString()) || '', service.amount, service.serviceDetails, service.status, service.paymentId, service.jobName, service.createdAt, service.updatedAt);
        });
    }
}
exports.ServicePaymentMongoRepositories = ServicePaymentMongoRepositories;
