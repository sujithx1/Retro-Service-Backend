"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/firebase.ts
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_config_1 = require("./firebase.config");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebase_config_1.firebaseCredentials),
    databaseURL: `https://${firebase_config_1.firebaseCredentials.project_id}.firebaseio.com`,
});
exports.default = firebase_admin_1.default;
