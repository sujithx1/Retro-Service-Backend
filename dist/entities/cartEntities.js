"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartEntities = void 0;
class CartEntities {
    constructor(id, userId, storeId, products, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.storeId = storeId;
        this.products = products;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.CartEntities = CartEntities;
