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
exports.StoreController = void 0;
const Validation_1 = require("../../../utils/helper/Validation");
const otp_1 = require("../../../utils/otp");
class StoreController {
    constructor(sendMails) {
        this.sendMails = sendMails;
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, owner_email, owner_name, password, owner_phone } = req.body;
                const userData = { name, owner_email, owner_name, owner_phone, password };
                (0, Validation_1.StoreSignupValidation)({ name, owner_email, owner_phone, owner_name, password, });
                const otp = (0, otp_1.generate_otp)();
                console.log("otp", otp);
                const storeOwner = yield this.sendMails.execute(owner_email, name, otp, userData);
                res.status(200).json({ message: "Enter Otp check your Email", storeOwner });
            }
            catch (error) {
                console.log("errpr", error.message);
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.StoreController = StoreController;
