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
exports.CheckoutMongoRepositories = void 0;
const checkoutEntities_1 = require("../../../entities/checkoutEntities");
const checkout_model_1 = require("../../../frameworks/db/models/checkout.model");
const returnChekout = (checkout) => {
    return new checkoutEntities_1.CheckoutEntities(checkout.id.toString(), checkout.userId, checkout.storeId, checkout.cart, checkout.total, checkout.paymentMethod, checkout.paymentStatus, checkout.orderStatus, checkout.transactionId, checkout.concern, checkout.createdAt, checkout.updatedAt);
};
class CheckoutMongoRepositories {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkout = yield checkout_model_1.CheckoutModel.findById(id)
                .populate("userId", "username email phone") // Populating user details
                .populate("storeId", "name location")
                .populate({
                path: "cart.products.product",
                model: "Product",
                select: "name images price",
            })
                .exec();
            if (!checkout)
                return null;
            return returnChekout(checkout);
        });
    }
    findByIdAndupdate(checkoutData) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkout = yield checkout_model_1.CheckoutModel.findByIdAndUpdate(checkoutData.id, Object.assign({}, checkoutData), {
                new: true, upsert: true, runValidators: true
            })
                .populate("userId", "username email phone") // Populating user details
                .populate({
                path: "cart.products.product",
                model: "Product",
                select: "name images price",
            })
                .populate("storeId", "name location") // Populating store details
                .exec();
            if (!checkout)
                return null;
            return returnChekout(checkout);
        });
    }
    findBycartId(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkout = yield checkout_model_1.CheckoutModel.findOne({ cartId: cartId })
                .populate("userId", "username email phone") // Populating user details
                .populate({
                path: "cart.products.product",
                model: "Product",
                select: "name images price",
            })
                .populate("storeId", "name location") // Populating store details
                .exec();
            if (!checkout)
                return null;
            return returnChekout(checkout);
        });
    }
    findByuserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkouts = yield checkout_model_1.CheckoutModel.find({ userId: userId })
                .populate("userId", "username email phone") // Populating user details
                .populate("storeId", "name location"); // Populating store details
            checkouts = yield Promise.all(checkouts.map((checkout) => __awaiter(this, void 0, void 0, function* () {
                return checkout.populate({
                    path: "cart.products.product",
                    model: "Product",
                    select: "name images price",
                });
            })));
            return checkouts.map((item) => returnChekout(item));
        });
    }
    findByStoreId(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkouts = yield checkout_model_1.CheckoutModel.find({ storeId: storeId })
                .populate("userId", "username email phone") // Populating user details
                .populate("storeId", "name location"); // Populating store details
            checkouts = yield Promise.all(checkouts.map((checkout) => __awaiter(this, void 0, void 0, function* () {
                return checkout.populate({
                    path: "cart.products.product",
                    model: "Product",
                    select: "name images price",
                });
            })));
            return checkouts.map((item) => returnChekout(item));
        });
    }
    create(checkoutData) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkout = yield checkout_model_1.CheckoutModel.create(checkoutData);
            return returnChekout(checkout);
        });
    }
}
exports.CheckoutMongoRepositories = CheckoutMongoRepositories;
