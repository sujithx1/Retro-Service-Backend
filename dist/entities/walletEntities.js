"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletEntities = void 0;
class WalletEntities {
    constructor(id, userId, userType, balance, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.userType = userType;
        this.balance = balance;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.WalletEntities = WalletEntities;
