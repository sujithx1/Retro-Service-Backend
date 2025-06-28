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
exports.Store_addproductuseCase = void 0;
const ProductEntities_1 = require("../../../entities/ProductEntities");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class Store_addproductuseCase {
    constructor(productRepositories) {
        this.productRepositories = productRepositories;
    }
    execute(storeId, name, quantity, price, description, images, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const existProduct = yield this.productRepositories.findByname(name);
            if (existProduct)
                throw new custom_errors_1.CustomError("product already exisist", 401, error_enum_1.AppError.DuplicateError);
            const product = new ProductEntities_1.Product_Entities("", storeId, name, description, quantity, category, price, images);
            return yield this.productRepositories.create(product);
        });
    }
}
exports.Store_addproductuseCase = Store_addproductuseCase;
