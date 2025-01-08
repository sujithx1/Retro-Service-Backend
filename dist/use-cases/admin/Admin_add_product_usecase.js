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
exports.Admin_add_product_Usecase = void 0;
const ProductEntities_1 = require("../../entities/ProductEntities");
class Admin_add_product_Usecase {
    constructor(adminRepositories) {
        this.adminRepositories = adminRepositories;
    }
    execute(name, description, stock, price, categoryName, images) {
        return __awaiter(this, void 0, void 0, function* () {
            const existProduct = yield this.adminRepositories.productFindbyName(name);
            if (existProduct)
                throw new Error("product already exist");
            const categoryId = yield this.adminRepositories.categoryFindbyName(categoryName);
            if (!categoryId)
                throw new Error("category not exist..");
            const productDate = new ProductEntities_1.Product_Entities("", name, description, stock, categoryId, price, images);
            const product = yield this.adminRepositories.productCreate(productDate);
            return new ProductEntities_1.Product_Entities(product.id, product.name, product.description, product.stock, product.categoryId, product.price, product.images, product.isBlock);
        });
    }
}
exports.Admin_add_product_Usecase = Admin_add_product_Usecase;
