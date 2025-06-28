"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStoreID = void 0;
const generateStoreID = (storeName) => {
    const cleanedName = storeName.trim().toLowerCase().replace(/\s+/g, "");
    const timestamp = Date.now().toString().slice(-4);
    return `${cleanedName}${timestamp}`;
};
exports.generateStoreID = generateStoreID;
