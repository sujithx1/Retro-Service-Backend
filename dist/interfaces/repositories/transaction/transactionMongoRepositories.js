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
exports.TransactionMongoRepositories = void 0;
const transactionEntities_1 = require("../../../entities/transactionEntities");
const transactionHistory_model_1 = require("../../../frameworks/db/models/transactionHistory.model");
class TransactionMongoRepositories {
    create(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield transactionHistory_model_1.TransactionModel.create(transaction);
            return new transactionEntities_1.TransactionEntities(service.id, service.userId._id.toString(), service.type, service.amount, service.status, service.paymentMethod, service.serviceType, service.createdAt, service.updatedAt);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield transactionHistory_model_1.TransactionModel.findById(id);
            if (!service)
                return null;
            return new transactionEntities_1.TransactionEntities(service.id, service.userId._id.toString(), service.type, service.amount, service.status, service.paymentMethod, service.serviceType, service.createdAt, service.updatedAt);
        });
    }
    findByidAndUpdate(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield transactionHistory_model_1.TransactionModel.findByIdAndUpdate(transaction.id, {
                type: transaction.type,
                amount: transaction.amount,
                status: transaction.status,
                paymentMethod: transaction.paymentMethod,
                serviceType: transaction.serviceType,
            }, { new: true, upsert: true });
            if (!service)
                return null;
            return new transactionEntities_1.TransactionEntities(service.id, service.userId._id.toString(), service.type, service.amount, service.status, service.paymentMethod, service.serviceType, service.createdAt, service.updatedAt);
        });
    }
    findbyUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const servcie = yield transactionHistory_model_1.TransactionModel.find({ userId: userId });
            return servcie.map((item) => new transactionEntities_1.TransactionEntities(item.id, item.userId._id.toString(), item.type, item.amount, item.status, item.paymentMethod, item.serviceType, item.createdAt, item.updatedAt));
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const trasnctions = yield transactionHistory_model_1.TransactionModel.find();
            return trasnctions.map((item) => new transactionEntities_1.TransactionEntities(item.id, item.userId._id.toString(), item.type, item.amount, item.status, item.paymentMethod, item.serviceType, item.createdAt, item.updatedAt));
        });
    }
}
exports.TransactionMongoRepositories = TransactionMongoRepositories;
