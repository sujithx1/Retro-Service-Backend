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
exports.User_orderputuseCase = void 0;
const transactionEntities_1 = require("../../../entities/transactionEntities");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class User_orderputuseCase {
    constructor(orderrepositories, walletrepositories, transactionrepositoires) {
        this.orderrepositories = orderrepositories;
        this.walletrepositories = walletrepositories;
        this.transactionrepositoires = transactionrepositoires;
    }
    execute(id, status, message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("return functionm", status, message);
            const findorder = yield this.orderrepositories.findById(id);
            if (!findorder)
                throw new custom_errors_1.CustomError("order not found", 404, error_enum_1.AppError.ResourceNotFound);
            findorder.orderStatus = status;
            if (status == "returned") {
                findorder.concern = message;
            }
            if (status === "return-confirmed") {
                // const userIdString = findorder.userId.toString();
                // console.log(userIdString);
                // Parse the stringified JSON
                const userIdString = JSON.stringify(findorder.userId);
                console.log(userIdString);
                const userIdObject = JSON.parse(userIdString);
                console.log(userIdObject);
                console.log(userIdObject._id);
                // Extract the _id field
                // const userId = userObject.id;
                // console.log(userId);
                const userwallet = yield this.walletrepositories.findByuserId(userIdObject._id);
                if (userwallet) {
                    userwallet.balance = +findorder.total;
                    const updateWallet = yield this.walletrepositories.findByuserIdandUpdate(userwallet);
                    if (!updateWallet)
                        throw new custom_errors_1.CustomError("wallet not updated", 500, error_enum_1.AppError.ServerError);
                    const usertransaction = new transactionEntities_1.TransactionEntities("", userIdObject._id, "refund", findorder.total, "complete", "wallet", "product");
                    yield this.transactionrepositoires.create(usertransaction);
                }
            }
            const update = yield this.orderrepositories.findByIdAndupdate(findorder);
            if (!update)
                throw new custom_errors_1.CustomError("order not updated", 500, error_enum_1.AppError.ServerError);
            return update;
        });
    }
}
exports.User_orderputuseCase = User_orderputuseCase;
