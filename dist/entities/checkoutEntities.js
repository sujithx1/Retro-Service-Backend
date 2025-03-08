"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutEntities = void 0;
class CheckoutEntities {
    constructor(id, userId, storeId, cart, total, paymentMethod, paymentStatus = "pending", orderStatus = "pending", transactionId, concern, createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.userId = userId;
        this.storeId = storeId;
        this.cart = cart;
        this.total = total;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
        this.transactionId = transactionId;
        this.concern = concern;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.CheckoutEntities = CheckoutEntities;
