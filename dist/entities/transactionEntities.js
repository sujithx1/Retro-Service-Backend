"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionEntities = void 0;
class TransactionEntities {
    constructor(id, userId, type, amount, status = "pending", paymentMethod, serviceType, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.amount = amount;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.serviceType = serviceType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.TransactionEntities = TransactionEntities;
