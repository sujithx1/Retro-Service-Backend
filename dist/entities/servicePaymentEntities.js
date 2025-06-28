"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePaymentEntity = void 0;
class ServicePaymentEntity {
    constructor(id, userId, employeeId, serviceId, amount, serviceDetails, status = "PENDING", paymentId, jobName, createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.userId = userId;
        this.employeeId = employeeId;
        this.serviceId = serviceId;
        this.amount = amount;
        this.serviceDetails = serviceDetails;
        this.status = status;
        this.paymentId = paymentId;
        this.jobName = jobName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.ServicePaymentEntity = ServicePaymentEntity;
