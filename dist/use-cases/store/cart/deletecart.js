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
exports.Cart_deleteCartid = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class Cart_deleteCartid {
    constructor(cartrepositories) {
        this.cartrepositories = cartrepositories;
    }
    execute(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartrepositories.findById(cartId);
            if (!cart)
                throw new custom_errors_1.CustomError("cart not found ", 404, error_enum_1.AppError.ServerError);
            // Check if the product exists in the cart
            const productIndex = cart.products.findIndex((product) => typeof product.product === "object" && "_id" in product.product && product.product._id.toString() === productId);
            if (productIndex === -1) {
                throw new custom_errors_1.CustomError("Product not found in cart", 404, error_enum_1.AppError.ResourceNotFound);
            }
            // Remove the product from the cart
            cart.products.splice(productIndex, 1);
            const updatedCart = yield this.cartrepositories.findByIdUpdate(cart);
            if (!updatedCart) {
                throw new custom_errors_1.CustomError("Failed to update cart", 500, error_enum_1.AppError.ServerError);
            }
            if (cart.products.length == 0) {
                yield this.cartrepositories.findByIdAndDelete(cart.id);
            }
            return true;
        });
    }
}
exports.Cart_deleteCartid = Cart_deleteCartid;
