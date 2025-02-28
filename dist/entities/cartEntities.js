"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartEntities = void 0;
class CartEntities {
    constructor(id, userId, storeId, productId, quantity, price, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.storeId = storeId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.CartEntities = CartEntities;
