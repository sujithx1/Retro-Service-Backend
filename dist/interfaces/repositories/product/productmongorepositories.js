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
exports.ProductMongoRepositories = void 0;
const ProductEntities_1 = require("../../../entities/ProductEntities");
const ProductModel_1 = require("../../../frameworks/db/models/ProductModel");
const returnproduct = (product) => {
    return new ProductEntities_1.Product_Entities(product._id.toString(), product.storeId.toString(), product.name, product.description, product.stock, product.category, product.price, product.images, product.isBlock, product.createdAt, product.updatedAt);
};
class ProductMongoRepositories {
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const addproduct = yield ProductModel_1.Product_Model.create(product);
            return returnproduct(addproduct);
        });
    }
    findByname(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductModel_1.Product_Model.findOne({ name: name });
            if (!product)
                return null;
            return returnproduct(product);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield ProductModel_1.Product_Model.find({ isBlock: false });
            return products.map((item) => returnproduct(item));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductModel_1.Product_Model.findById(id)
                .populate("category", "name description")
                .exec();
            if (!product)
                return null;
            // await product.populate("storeId", "name ownername")
            return returnproduct(product);
        });
    }
    findByIdandUpdate(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield ProductModel_1.Product_Model.findByIdAndUpdate(productData.id, Object.assign({}, productData), { new: true, runValidators: true, upsert: true } // `new: true` returns the updated document
            );
            if (!updatedProduct)
                return null;
            // await updatedProduct.populate({
            //   path: "category",
            //   select: "name description",
            // })
            // await updatedProduct.populate({
            //   path:'storeId',
            //   select:'name owner_name'
            // })
            return returnproduct(updatedProduct);
        });
    }
    findBystoreId(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield ProductModel_1.Product_Model.find({ storeId: storeId });
            return products.map((item) => returnproduct(item));
        });
    }
    searchByname(quary) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield ProductModel_1.Product_Model.find({
                name: { $regex: quary, $options: "i" }, // Case-insensitive search
            });
            return products.map((item) => returnproduct(item));
        });
    }
}
exports.ProductMongoRepositories = ProductMongoRepositories;
