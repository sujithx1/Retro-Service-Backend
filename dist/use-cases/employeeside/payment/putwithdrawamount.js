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
exports.Employee_putwithrdawamountuseCase = void 0;
const transactionEntities_1 = require("../../../entities/transactionEntities");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class Employee_putwithrdawamountuseCase {
    constructor(walletrepositories, employeerepositories, transactionrepositoires) {
        this.walletrepositories = walletrepositories;
        this.employeerepositories = employeerepositories;
        this.transactionrepositoires = transactionrepositoires;
    }
    execute(empId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield this.walletrepositories.findByEmployeeId(empId);
            if (!wallet)
                throw new custom_errors_1.CustomError("wallet not found", 401, error_enum_1.AppError.ResourceNotFound);
            wallet.balance = amount;
            const updateWallet = yield this.walletrepositories.findByIdandUpdate(wallet);
            if (!updateWallet)
                throw new custom_errors_1.CustomError("wallet not updated", 401, error_enum_1.AppError.ServerError);
            const updateemployeerevenu = yield this.employeerepositories.findIdAndDecrementRevenue(empId, amount);
            if (!updateemployeerevenu)
                throw new custom_errors_1.CustomError("employee not updated", 401, error_enum_1.AppError.ServerError);
            const transaction = new transactionEntities_1.TransactionEntities("", empId, "withdrawal", amount, "complete", "wallet", "add");
            yield this.transactionrepositoires.create(transaction);
            return updateWallet;
        });
    }
}
exports.Employee_putwithrdawamountuseCase = Employee_putwithrdawamountuseCase;
