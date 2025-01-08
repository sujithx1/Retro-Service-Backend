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
exports.Admin_Del_Category_useCase = void 0;
const CategoryEntities_1 = require("../../../entities/CategoryEntities");
class Admin_Del_Category_useCase {
    constructor(categoryRepositories) {
        this.categoryRepositories = categoryRepositories;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepositories.categoryFindbyId(id);
            if (!category)
                throw new Error("id not  valid");
            console.log(category);
            if (category.isBlock === undefined || category.isBlock === null) {
                throw new Error("isBlock field is missing or invalid");
            }
            category.isBlock = !category.isBlock;
            console.log(category);
            const updatecategory = yield this.categoryRepositories.categoryFindbyIdAndUpdate(category);
            console.log(updatecategory);
            if (!updatecategory)
                throw new Error("Not Updated");
            return new CategoryEntities_1.CategoryEntities(updatecategory.id, updatecategory.name, updatecategory.description, updatecategory.isBlock);
        });
    }
}
exports.Admin_Del_Category_useCase = Admin_Del_Category_useCase;
