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
exports.Admin_add_Category_useCase = void 0;
const CategoryEntities_1 = require("../../../entities/CategoryEntities");
class Admin_add_Category_useCase {
    constructor(categoryRepositoris) {
        this.categoryRepositoris = categoryRepositoris;
    }
    execute(name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCategory = yield this.categoryRepositoris.categoryFindbyName(name);
            if (existCategory)
                throw new Error("Category Already Exists");
            const categoryData = new CategoryEntities_1.CategoryEntities("", name, description);
            const category = yield this.categoryRepositoris.categoryCreate(categoryData);
            return new CategoryEntities_1.CategoryEntities(category.id, category.name, category.description, category.isBlock);
        });
    }
}
exports.Admin_add_Category_useCase = Admin_add_Category_useCase;
