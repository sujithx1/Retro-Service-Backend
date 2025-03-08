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
exports.CartMongoRepositories = void 0;
const cartEntities_1 = require("../../../entities/cartEntities");
const cartModel_1 = require("../../../frameworks/db/models/cartModel");
const returnCart = (cart) => {
    return new cartEntities_1.CartEntities(cart.id.toString(), cart.userId, cart.storeId, cart.products, cart.createdAt, cart.updatedAt);
};
class CartMongoRepositories {
    create(cartData) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartModel_1.CartModel.create(cartData);
            const populatedCart = yield cartModel_1.CartModel.findById(cart._id)
                .populate("products.product", "name images price stock")
                .populate("userId", "username email phone")
                .populate("storeId", "username email phone")
                .exec();
            return returnCart(populatedCart);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartModel_1.CartModel.findById(id);
            if (!cart)
                return null;
            return returnCart(cart);
        });
    }
    findByIdUpdate(cartData) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartModel_1.CartModel.findByIdAndUpdate(cartData.id, Object.assign({}, cartData), {
                new: true, upsert: true, runValidators: true
            })
                .populate("products.product", "name images price stock") // Only fetch required fields
                .populate("userId", "username email phone") // Only fetch required fields
                .exec();
            if (!cart)
                return null;
            return returnCart(cart);
        });
    }
    findByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartModel_1.CartModel.findOne({ "products.product": productId })
                .populate("products.product", "name images price stock") // Fixed typo
                .populate("userId", "username email phone") // Fetch required fields
                .exec();
            if (!cart)
                return null;
            return returnCart(cart);
        });
    }
    findByuserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartModel_1.CartModel.findOne({ userId: userId })
                .populate("products.product", "name images price stock") // Only fetch required fields
                .populate("userId", "username email phone") // Only fetch required fields
                .exec();
            if (!cart)
                return null;
            return returnCart(cart);
        });
    }
    findByIdAndDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartModel_1.CartModel.findByIdAndDelete(id);
            if (!cart)
                return false;
            return true;
        });
    }
    findByIdDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield cartModel_1.CartModel.findByIdAndDelete(id);
        });
    }
}
exports.CartMongoRepositories = CartMongoRepositories;
