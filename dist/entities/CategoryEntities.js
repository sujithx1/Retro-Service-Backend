"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryEntities = void 0;
class CategoryEntities {
    constructor(id, name, description, isBlock = false) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isBlock = isBlock;
    }
}
exports.CategoryEntities = CategoryEntities;
