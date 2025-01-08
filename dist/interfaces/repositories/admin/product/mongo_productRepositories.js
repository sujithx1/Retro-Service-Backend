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
exports.Mongo_Product_adminrepositories = void 0;
const ProductEntities_1 = require("../../../../entities/ProductEntities");
const ProductModel_1 = require("../../../../frameworks/db/models/ProductModel");
class Mongo_Product_adminrepositories {
    productCreate(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDate = yield ProductModel_1.Product_Model.create(product);
            yield productDate.populate("Category");
            const categoryName = productDate.category.name;
            return new ProductEntities_1.Product_Entities(productDate.id, productDate.name, productDate.description, productDate.stock, categoryName, productDate.price, productDate.images, productDate.isBlock, productDate.createdAt, productDate.updatedAt);
        });
    }
    productFindbyName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductModel_1.Product_Model.findOne({ name: name }).populate("Category");
            if (!product)
                return null;
            return new ProductEntities_1.Product_Entities(product.id, product.name, product.description, product.stock, product.category.name, product.price, product.images, product.isBlock, product.createdAt, product.updatedAt);
        });
    }
}
exports.Mongo_Product_adminrepositories = Mongo_Product_adminrepositories;
