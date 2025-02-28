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
    execute(cartData) {
        return __awaiter(this, void 0, void 0, function* () {
            const findcart = yield this.cartrepositories.findById(cartData.id);
            if (!findcart)
                throw new custom_errors_1.CustomError('cart not found', 401, error_enum_1.AppError.ResourceNotFound);
            const findproduct = yield this.productrepositories.findById(cartData.productId.toString());
            if (!findproduct)
                throw new custom_errors_1.CustomError('product not found', 401, error_enum_1.AppError.ResourceNotFound);
            findcart.quantity = +cartData.quantity,
                findcart.price = findcart.quantity * findproduct.price;
            const updatecart = yield this.cartrepositories.findByIdUpdate(findcart);
            if (!updatecart)
                throw new custom_errors_1.CustomError('cart not  updated', 401, error_enum_1.AppError.ServerError);
            return updatecart;
        });
    }
}
exports.Cart_updateuseCase = Cart_updateuseCase;
