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
exports.AddtoCartuseCase = void 0;
const cartEntities_1 = require("../../../entities/cartEntities");
class AddtoCartuseCase {
    constructor(cartrepositories) {
        this.cartrepositories = cartrepositories;
    }
    execute(userId, storeId, productId, quantity, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = [{
                    product: productId,
                    quantity,
                    price
                }];
            const cart = new cartEntities_1.CartEntities("", userId, storeId, products);
            return yield this.cartrepositories.create(cart);
        });
    }
}
exports.AddtoCartuseCase = AddtoCartuseCase;
