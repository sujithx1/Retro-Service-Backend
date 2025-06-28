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
exports.Mongo_catgoriesRepositories = void 0;
const CategoryEntities_1 = require("../../../../entities/CategoryEntities");
const Category_Model_1 = require("../../../../frameworks/db/models/Category_Model");
class Mongo_catgoriesRepositories {
    categoryCreate(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryData = yield Category_Model_1.CategoryModel.create(category);
            return new CategoryEntities_1.CategoryEntities(categoryData.id, categoryData.name, categoryData.description);
        });
    }
    categoryFindbyName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_Model_1.CategoryModel.findOne({ name: name });
            if (!category)
                return null;
            return category._id.toString();
        });
    }
    categoryFindbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_Model_1.CategoryModel.findById(id);
            if (!category) {
                return null;
            }
            return new CategoryEntities_1.CategoryEntities(category.id, category.name, category.description, category.isBlock);
        });
    }
    categoryFindbyIdAndUpdate(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryData = yield Category_Model_1.CategoryModel.findByIdAndUpdate(category.id, { name: category.name, description: category.description, isBlock: category.isBlock }, { new: true });
            if (!categoryData) {
                return null;
            }
            categoryData.save();
            return new CategoryEntities_1.CategoryEntities(categoryData.id, categoryData.name, categoryData.description, categoryData.isBlock);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield Category_Model_1.CategoryModel.find();
            return categories.map((item) => new CategoryEntities_1.CategoryEntities(item.id, item.name, item.description, item.isBlock));
        });
    }
    categgoryFindByNameReturnCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_Model_1.CategoryModel.findOne({ name });
            if (!category)
                return null;
            return new CategoryEntities_1.CategoryEntities(category.id, category.name, category.description, category.isBlock);
        });
    }
}
exports.Mongo_catgoriesRepositories = Mongo_catgoriesRepositories;
