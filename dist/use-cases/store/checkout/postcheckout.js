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
exports.CheckOut_useCase = void 0;
const checkoutEntities_1 = require("../../../entities/checkoutEntities");
const transactionEntities_1 = require("../../../entities/transactionEntities");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class CheckOut_useCase {
    constructor(checkoutrepositories, cartrepositoires, transactionrepositories) {
        this.checkoutrepositories = checkoutrepositories;
        this.cartrepositoires = cartrepositoires;
        this.transactionrepositories = transactionrepositories;
    }
    execute(cartId, total, paymentMethod, transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartrepositoires.findById(cartId);
            if (!cart)
                throw new custom_errors_1.CustomError("Cart not Found", 404, error_enum_1.AppError.ResourceNotFound);
            const products = cart.products;
            const checkoutEntity = new checkoutEntities_1.CheckoutEntities("", cart.userId.toString(), cart.storeId, {
                products
            }, total, paymentMethod, "completed", "pending", transactionId);
            console.log(checkoutEntity);
            const checkout = yield this.checkoutrepositories.create(checkoutEntity);
            const usertransaction = new transactionEntities_1.TransactionEntities("", checkout.userId.toString(), "purchase", Number(total), "complete", "razorypay", "product");
            yield this.transactionrepositories.create(usertransaction);
            yield this.cartrepositoires.findByIdAndDelete(cart.id);
            return checkout;
        });
    }
}
exports.CheckOut_useCase = CheckOut_useCase;
