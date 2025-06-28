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
exports.Cart_updateuseCase = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class Cart_updateuseCase {
    constructor(cartrepositories, productrepositories) {
        this.cartrepositories = cartrepositories;
        this.productrepositories = productrepositories;
    }
    execute(id, userId, storeId, productId, quantity, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const findCart = yield this.cartrepositories.findById(id);
            if (!findCart) {
                throw new custom_errors_1.CustomError("Cart not found", 404, error_enum_1.AppError.ResourceNotFound);
            }
            const findProduct = yield this.productrepositories.findById(productId);
            if (!findProduct) {
                throw new custom_errors_1.CustomError("Product not found", 404, error_enum_1.AppError.ResourceNotFound);
            }
            const productIndex = findCart.products.findIndex((product) => typeof product.product === "object" && "_id" in product.product && product.product._id.toString() === productId);
            if (productIndex === -1) {
                const product = {
                    product: productId,
                    quantity,
                    price
                };
                findCart.products.push(product);
                //   throw new CustomError(
                //     "Product not found in cart",
                //     404,
                //     AppError.ResourceNotFound
                //   );
            }
            else {
                findCart.products[productIndex].quantity = quantity;
                findCart.products[productIndex].price = quantity * findProduct.price;
            }
            // Save the updated cart
            const updatedCart = yield this.cartrepositories.findByIdUpdate(findCart);
            if (!updatedCart) {
                throw new custom_errors_1.CustomError("Cart update failed", 500, error_enum_1.AppError.ServerError);
            }
            return updatedCart;
        });
    }
}
exports.Cart_updateuseCase = Cart_updateuseCase;
