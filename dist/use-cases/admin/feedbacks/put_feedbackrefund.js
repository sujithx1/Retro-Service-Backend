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
exports.Admin_putfeedBackrefunduseCase = void 0;
const transactionEntities_1 = require("../../../entities/transactionEntities");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class Admin_putfeedBackrefunduseCase {
    constructor(userRepositories, employeeRepositories, Walletrepositories, feedbackRepositories, serviceRepositories, transactionRepositories) {
        this.userRepositories = userRepositories;
        this.employeeRepositories = employeeRepositories;
        this.Walletrepositories = Walletrepositories;
        this.feedbackRepositories = feedbackRepositories;
        this.serviceRepositories = serviceRepositories;
        this.transactionRepositories = transactionRepositories;
    }
    execute(feedbackId) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedback = yield this.feedbackRepositories.findbyId(feedbackId);
            if (!feedback)
                throw new custom_errors_1.CustomError("Feedback Not Found", 401, error_enum_1.AppError.ResourceNotFound);
            console.log("find feed back ", feedback);
            const user = yield this.userRepositories.findById(feedback.user);
            if (!user)
                throw new custom_errors_1.CustomError("user Not Found", 401, error_enum_1.AppError.UserNotFound);
            const employee = yield this.employeeRepositories.findById(feedback.employee);
            if (!employee)
                throw new custom_errors_1.CustomError("employee Not Found", 401, error_enum_1.AppError.UserNotFound);
            const userwallet = yield this.Walletrepositories.findByuserId(user.id);
            if (!userwallet)
                throw new custom_errors_1.CustomError("user wallet Not Found", 401, error_enum_1.AppError.ResourceNotFound);
            const adminwallet = yield this.Walletrepositories.findByAdmin();
            if (!adminwallet)
                throw new custom_errors_1.CustomError(" admin wallet Not Found", 401, error_enum_1.AppError.ResourceNotFound);
            feedback.amount ? (userwallet.balance = feedback.amount) : userwallet;
            feedback.amount ? (adminwallet.balance = -feedback.amount) : adminwallet;
            const updateadminwallet = yield this.Walletrepositories.findByIdandDecrementBalance(adminwallet);
            if (!updateadminwallet)
                throw new custom_errors_1.CustomError("admin wallet Not updated", 500, error_enum_1.AppError.ServerError);
            const updateuserWallet = yield this.Walletrepositories.findByIdandUpdate(userwallet);
            if (!updateuserWallet)
                throw new custom_errors_1.CustomError("user wallet Not updated", 401, error_enum_1.AppError.ServerError);
            const update = yield this.feedbackRepositories.findByIdAndupdate(feedback);
            if (!update)
                throw new custom_errors_1.CustomError("Feedback Not updated", 401, error_enum_1.AppError.ServerError);
            const service = yield this.serviceRepositories.findbyId(feedback.bookingId);
            if (!service)
                throw new custom_errors_1.CustomError("servive Not Found", 401, error_enum_1.AppError.ResourceNotFound);
            service.status = "CANCELLED";
            const updateservice = yield this.serviceRepositories.findByIdAndUpdateCancellBooking(service);
            if (!updateservice)
                throw new custom_errors_1.CustomError("service Not updated", 401, error_enum_1.AppError.ServerError);
            const usertranasaction = new transactionEntities_1.TransactionEntities("", user.id.toString(), "refund", 100, "complete", "razorypay", "service");
            yield this.transactionRepositories.create(usertranasaction);
            return update;
        });
    }
}
exports.Admin_putfeedBackrefunduseCase = Admin_putfeedBackrefunduseCase;
