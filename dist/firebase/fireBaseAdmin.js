"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/firebase.ts
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_adminsdk_json_1 = __importDefault(require("./firebase-adminsdk.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebase_adminsdk_json_1.default),
});
exports.default = firebase_admin_1.default;
