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
exports.Store_putproductuseCase = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class Store_putproductuseCase {
    constructor(productRepositories) {
        this.productRepositories = productRepositories;
    }
    execute(id, name, quantity, price, description, images, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepositories.findById(id);
            if (!product)
                throw new custom_errors_1.CustomError("product not found", 401, error_enum_1.AppError.ResourceNotFound);
            if (product.name !== name) {
                const existproduct = yield this.productRepositories.findByname(name);
                if (existproduct)
                    throw new custom_errors_1.CustomError("product already exist ", 401, error_enum_1.AppError.DuplicateError);
            }
            product.stock = quantity,
                product.price = price,
                product.description = description,
                product.images = images,
                product.category = category;
            const update = yield this.productRepositories.findByIdandUpdate(product);
            if (!update)
                throw new custom_errors_1.CustomError("product not updated ", 401, error_enum_1.AppError.ServerError);
            return update;
        });
    }
}
exports.Store_putproductuseCase = Store_putproductuseCase;
