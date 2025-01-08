"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product_Entities = void 0;
class Product_Entities {
    constructor(id, name, description, stock, categoryId, price, images, isBlock = false, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stock = stock;
        this.categoryId = categoryId;
        this.price = price;
        this.images = images;
        this.isBlock = isBlock;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Product_Entities = Product_Entities;
