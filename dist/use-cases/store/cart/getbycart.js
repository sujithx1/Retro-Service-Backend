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
exports.GetCart_byIduseCase = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class GetCart_byIduseCase {
    constructor(cartrepositories) {
        this.cartrepositories = cartrepositories;
    }
    execute(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartrepositories.findById(cartId);
            if (!cart)
                throw new custom_errors_1.CustomError('cart not found', 404, error_enum_1.AppError.ResourceNotFound);
            return cart;
        });
    }
}
exports.GetCart_byIduseCase = GetCart_byIduseCase;
