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
exports.Store20kmDistance = void 0;
// import { Locationuser_types } from "../../types/user";
const custom_errors_1 = require("../../utils/errors/custom.errors");
const error_enum_1 = require("../../utils/errors/error.enum");
class Store20kmDistance {
    constructor(storerepositories, productrepositories) {
        this.storerepositories = storerepositories;
        this.productrepositories = productrepositories;
    }
    execute(lat, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield this.storerepositories.find20Km({ lat, lng });
            if (stores.length === 0) {
                throw new custom_errors_1.CustomError("No stores Found", 401, error_enum_1.AppError.ResourceNotFound);
            }
            // Fetch total products count for each store
            const storesWithProducts = yield Promise.all(stores.map((store) => __awaiter(this, void 0, void 0, function* () {
                const products = yield this.productrepositories.findBystoreId(store.id);
                let total_product;
                total_product = products.length; // Count number of products for the store
                return {
                    store,
                    total_product,
                };
            })));
            return storesWithProducts;
        });
    }
}
exports.Store20kmDistance = Store20kmDistance;
