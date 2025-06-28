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
const store_map_1 = require("../../../DTO/map/store.map");
const StoreEntities_1 = require("../../../entities/StoreEntities");
const walletEntities_1 = require("../../../entities/walletEntities");
const hashPassword_1 = require("../../../utils/hashPassword");
const generateStoreId_1 = require("../../../utils/helper/generateStoreId");
const redis_1 = __importDefault(require("../../../utils/helper/redis"));
const otp_1 = require("../../../utils/otp");
class SendOtp {
    constructor(storeRepositories, walletrepositories) {
        this.storeRepositories = storeRepositories;
        this.walletrepositories = walletrepositories;
    }
    execute(username, otp, storeDetails //
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(storeDetails.owner_email);
            const storeOwner = yield this.storeRepositories.findByowner_email(storeDetails.owner_email);
            if (storeOwner) {
                console.log("User already exists");
                const storeId = yield (0, generateStoreId_1.generateStoreID)(storeDetails.name);
                const hashPassword = yield (0, hashPassword_1.hashpass)(storeDetails.password);
                const newstore = new StoreEntities_1.StoreEntities("", storeDetails.name, storeDetails.owner_name, storeDetails.owner_email, storeDetails.owner_phone, true, hashPassword, storeId);
                const store = yield this.storeRepositories.create(newstore);
                yield (0, otp_1.sendOtp)(storeDetails.owner_email, username, storeId, true);
                const wallet = new walletEntities_1.WalletEntities("", store.id, "store", 0);
                this.walletrepositories.create(wallet);
                return store_map_1.StoreMap.toResponse(store);
            }
            try {
                const sendOtpMail = yield (0, otp_1.sendOtp)(storeDetails.owner_email, username, otp);
                const storeData = new StoreEntities_1.StoreEntities("", storeDetails.name, storeDetails.owner_name, storeDetails.owner_email, storeDetails.owner_phone, true, storeDetails.password, "");
                yield redis_1.default.setEx("storeotp", 60, JSON.stringify(otp));
                yield redis_1.default.setEx("storeData", 60, JSON.stringify(storeData));
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
