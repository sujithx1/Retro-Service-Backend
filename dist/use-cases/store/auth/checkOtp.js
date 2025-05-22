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
exports.Store_otpcheck = void 0;
const store_map_1 = require("../../../DTO/map/store.map");
const walletEntities_1 = require("../../../entities/walletEntities");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
const hashPassword_1 = require("../../../utils/hashPassword");
const generateStoreId_1 = require("../../../utils/helper/generateStoreId");
const redis_1 = __importDefault(require("../../../utils/helper/redis"));
const otp_1 = require("../../../utils/otp");
class Store_otpcheck {
    constructor(otpchecking, storeRepositories, walletrepositories) {
        this.otpchecking = otpchecking;
        this.storeRepositories = storeRepositories;
        this.walletrepositories = walletrepositories;
    }
    execute(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedOtp = yield redis_1.default.get("storeotp");
            if (!storedOtp)
                throw new custom_errors_1.CustomError("OTP expired ", 401, error_enum_1.AppError.OtpExpired);
            const checkotp = yield this.otpchecking.execute(Number(otp), Number(storedOtp));
            if (!checkotp)
                throw new custom_errors_1.CustomError("Invalid OTP", 401, error_enum_1.AppError.OtpMismatch);
            const storeData = yield redis_1.default.get("storeData");
            if (!storeData)
                throw new custom_errors_1.CustomError("storeData Not found ", 401, error_enum_1.AppError.ResourceNotFound);
            const storeDetails = JSON.parse(storeData);
            const storeId = yield (0, generateStoreId_1.generateStoreID)(storeDetails.name);
            storeDetails.storeId = storeId;
            console.log(storeId);
            yield (0, otp_1.sendOtp)(storeDetails.owner_email, storeDetails.name, storeId, true);
            const hashPassword = yield (0, hashPassword_1.hashpass)(storeDetails.password);
            storeDetails.password = hashPassword;
            const store = yield this.storeRepositories.create(storeDetails);
            const wallet = new walletEntities_1.WalletEntities("", store.id, "store", 0);
            this.walletrepositories.create(wallet);
            return store_map_1.StoreMap.toResponse(store);
        });
    }
}
exports.Store_otpcheck = Store_otpcheck;
