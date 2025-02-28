"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productcontroller = void 0;
const productController_1 = require("../../interfaces/controllers/products/productController");
const productmongorepositories_1 = require("../../interfaces/repositories/product/productmongorepositories");
const getproductsbystoreId_1 = require("../../use-cases/store/getproductsbystoreId");
const productrepositories = new productmongorepositories_1.ProductMongoRepositories();
const getproductsbyStoreId = new getproductsbystoreId_1.Store_getproductsbystoreId(productrepositories);
exports.productcontroller = new productController_1.ProductController(getproductsbyStoreId);
