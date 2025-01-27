"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectdb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectdb = () => {
    const dbUrl = process.env.DB_URL;
    mongoose_1.default
        .connect(`${dbUrl}`)
        .then(() => console.log("mongoDb connected"))
        .catch((err) => console.log("mongodb not connected", err));
};
exports.connectdb = connectdb;
