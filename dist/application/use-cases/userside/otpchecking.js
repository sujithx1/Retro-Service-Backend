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
exports.CheckOtp = void 0;
class CheckOtp {
    execute(userOtp, cookieOtp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cookieOtp) {
                throw new Error("Cookie OTP is missing");
            }
            if (userOtp !== cookieOtp) {
                throw new Error("Otp not matching");
            }
            return true;
        });
    }
}
exports.CheckOtp = CheckOtp;
