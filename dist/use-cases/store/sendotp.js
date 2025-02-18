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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOtp = void 0;
const StoreEntities_1 = require("../../entities/StoreEntities");
const redis_1 = __importDefault(require("../../utils/helper/redis"));
const otp_1 = require("../../utils/otp");
class SendOtp {
    constructor(storeRepositories) {
        this.storeRepositories = storeRepositories;
    }
    execute(email, username, otp, storeDetails // ✅ Default empty values
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(email);
            const storeOwner = yield this.storeRepositories.findByowner_email(email);
            if (storeOwner) {
                console.log("User already exists");
                const storeId = (0, otp_1.generate_otp)();
                const newstore = new StoreEntities_1.StoreEntities("", storeDetails.name, storeDetails.owner_name, storeDetails.owner_email, storeDetails.owner_phone, true, storeDetails.password, storeId);
                yield this.storeRepositories.create(newstore);
                return storeId;
            }
            try {
                const sendOtpMail = yield (0, otp_1.sendOtp)(email, username, otp);
                yield redis_1.default.setEx("otp", 60, JSON.stringify(otp));
                yield redis_1.default.setEx("userData", 60, JSON.stringify(storeDetails));
                console.log(sendOtpMail);
            }
            catch (error) {
                console.error("Error sending OTP:", error);
                throw new Error("Failed to send OTP");
            }
        });
    }
}
exports.SendOtp = SendOtp;
