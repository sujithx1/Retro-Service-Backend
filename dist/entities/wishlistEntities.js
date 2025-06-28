"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistEntity = void 0;
class WishlistEntity {
    constructor(id, userId, productId, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.WishlistEntity = WishlistEntity;
