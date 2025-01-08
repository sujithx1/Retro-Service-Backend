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
exports.Forgot_PasswordotpUseCase = void 0;
const custom_errors_1 = require("../../utils/errors/custom.errors");
const error_enum_1 = require("../../utils/errors/error.enum");
const redis_1 = __importDefault(require("../../utils/helper/redis"));
const otp_1 = require("../../utils/otp");
class Forgot_PasswordotpUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    execute(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findByemail(email);
            if (!user)
                throw new custom_errors_1.CustomError("user Not Found", 404, error_enum_1.AppError.UserNotFound);
            const otp = (0, otp_1.generate_otp)();
            console.log("otp", otp);
            yield (0, otp_1.sendOtp)(email, user.username, otp);
            yield redis_1.default.setEx("forgot-password-otp", 60, JSON.stringify(otp));
            return true;
        });
    }
}
exports.Forgot_PasswordotpUseCase = Forgot_PasswordotpUseCase;
