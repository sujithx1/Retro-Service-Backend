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
const CategoryEntities_1 = require("../../entities/CategoryEntities");
class Admin_edit_Category_useCase {
    constructor(adminRespositories) {
        this.adminRespositories = adminRespositories;
    }
    execute(id, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.adminRespositories.categoryFindbyId(id);
            if (!category)
                throw new Error("Id is not valid");
            category.name = name;
            category.description = description;
            const updatecategory = yield this.adminRespositories.categoryFindbyIdAndUpdate(category);
            if (!updatecategory)
                throw new Error("not Updated");
            return new CategoryEntities_1.CategoryEntities(updatecategory.id, updatecategory.name, updatecategory.description, updatecategory.isBlock);
        });
    }
}
exports.Admin_edit_Category_useCase = Admin_edit_Category_useCase;
