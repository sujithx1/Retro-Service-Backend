"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product_Model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Product_schema = new mongoose_1.default.Schema({
    storeId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Store",
        required: true
    },
    name: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: {
        type: [String],
        required: true
    },
    isBlock: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
exports.Product_Model = mongoose_1.default.model("Product", Product_schema);
