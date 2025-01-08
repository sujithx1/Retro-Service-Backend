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
exports.Admin_edit_Category_useCase = void 0;
const CategoryEntities_1 = require("../../../entities/CategoryEntities");
class Admin_edit_Category_useCase {
    constructor(categoryRepositories) {
        this.categoryRepositories = categoryRepositories;
    }
    execute(id, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepositories.categoryFindbyId(id);
            if (!category)
                throw new Error("Id is not valid");
            const existname = yield this.categoryRepositories.categgoryFindByNameReturnCategory(name);
            if (existname) {
                console.log(existname);
                if (category.name !== existname.name)
                    throw new Error("category name already exist");
            }
            category.name = name;
            category.description = description;
            console.log(category);
            const updatecategory = yield this.categoryRepositories.categoryFindbyIdAndUpdate(category);
            if (!updatecategory)
                throw new Error("not Updated");
            return new CategoryEntities_1.CategoryEntities(updatecategory.id, updatecategory.name, updatecategory.description, updatecategory.isBlock);
        });
    }
}
exports.Admin_edit_Category_useCase = Admin_edit_Category_useCase;
