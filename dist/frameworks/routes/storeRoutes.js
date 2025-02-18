"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storeController_1 = require("../../interfaces/controllers/store/storeController");
const sendotp_1 = require("../../use-cases/store/sendotp");
const storeMongorepositories_1 = require("../../interfaces/repositories/store/storeMongorepositories");
const storeRepositories = new storeMongorepositories_1.StoreMongoRepositories();
const sendOtp = new sendotp_1.SendOtp(storeRepositories);
const storeController = new storeController_1.StoreController(sendOtp);
const router = express_1.default.Router();
router.post('/register', (req, res, next) => {
    storeController.signUp(req, res, next);
});
// front endil check store owner  is valid otp send 
