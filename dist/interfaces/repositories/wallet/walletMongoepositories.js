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
exports.WalletMongoRepositories = void 0;
const walletEntities_1 = require("../../../entities/walletEntities");
const WalletModel_1 = require("../../../frameworks/db/models/WalletModel");
class WalletMongoRepositories {
    findByEmployeeId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield WalletModel_1.WalletModel.findOne({ userId, userType: "employee" });
            if (!wallet)
                return null;
            return new walletEntities_1.WalletEntities(wallet.id, wallet.userId.toString(), wallet.userType, wallet.balance, wallet.createdAt, wallet.updatedAt);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield WalletModel_1.WalletModel.findById(id);
            if (!wallet)
                return null;
            return new walletEntities_1.WalletEntities(wallet.id, wallet.userId.toString(), wallet.userType, wallet.balance, wallet.createdAt, wallet.updatedAt);
        });
    }
    findByuserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield WalletModel_1.WalletModel.findOne({ userId, userType: "user" });
            if (!wallet)
                return null;
            return new walletEntities_1.WalletEntities(wallet.id, wallet.userId.toString(), wallet.userType, wallet.balance, wallet.createdAt, wallet.updatedAt);
        });
    }
    findByIdandUpdate(wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletData = yield WalletModel_1.WalletModel.findByIdAndUpdate(wallet.id, {
                $inc: { balance: wallet.balance }, // Fixing the typo
            }, { new: true, runValidators: true, upsert: true } // Ensures updated document is returned
            );
            if (!wallet)
                return null;
            return new walletEntities_1.WalletEntities(walletData.id, walletData.userId.toString(), walletData.userType, walletData.balance, walletData.createdAt, walletData.updatedAt);
        });
    }
    findByuserIdandUpdate(wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletData = yield WalletModel_1.WalletModel.findOneAndUpdate({ userId: wallet.userId }, {
                $inc: { balance: wallet.balance }, // Fixing the typo
            }, { new: true, runValidators: true, upsert: true } // Ensures updated document is returned
            );
            if (!wallet)
                return null;
            return new walletEntities_1.WalletEntities(walletData.id, walletData.userId.toString(), walletData.userType, walletData.balance, walletData.createdAt, walletData.updatedAt);
        });
    }
    create(wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletData = yield WalletModel_1.WalletModel.create(wallet);
            return new walletEntities_1.WalletEntities(walletData.id, walletData.userId.toString(), walletData.userType, walletData.balance, walletData.createdAt, walletData.updatedAt);
        });
    }
    findByAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const walletData = yield WalletModel_1.WalletModel.findOne({ userType: 'admin' });
            if (!walletData)
                return null;
            return new walletEntities_1.WalletEntities(walletData.id, walletData.userId.toString(), walletData.userType, walletData.balance, walletData.createdAt, walletData.updatedAt);
        });
    }
    findByIdandDecrementBalance(wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletData = yield WalletModel_1.WalletModel.findByIdAndUpdate(wallet.id, {
                $inc: { balance: -Math.abs(wallet.balance) }, // Fixing the typo
            }, { new: true, runValidators: true, upsert: true } // Ensures updated document is returned
            );
            if (!wallet)
                return null;
            return new walletEntities_1.WalletEntities(walletData.id, walletData.userId.toString(), walletData.userType, walletData.balance, walletData.createdAt, walletData.updatedAt);
        });
    }
    findByStoreId(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield WalletModel_1.WalletModel.findOne({ userId: storeId, userType: "store" });
            if (!wallet)
                return null;
            return new walletEntities_1.WalletEntities(wallet.id, wallet.userId.toString(), wallet.userType, wallet.balance, wallet.createdAt, wallet.updatedAt);
        });
    }
}
exports.WalletMongoRepositories = WalletMongoRepositories;
