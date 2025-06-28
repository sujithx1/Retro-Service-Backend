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
exports.EmployeeSendOtp = void 0;
const otp_1 = require("../../utils/otp");
class EmployeeSendOtp {
    constructor(EmployeeRepositories) {
        this.EmployeeRepositories = EmployeeRepositories;
    }
    execute(email, username, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const existEmp = yield this.EmployeeRepositories.findByEmail(email);
            if (existEmp) {
                console.log("user alreadu exist");
                throw new Error("User Already Exist");
            }
            const sendotpmail = yield (0, otp_1.sendOtp)(email, username, otp);
            console.log(sendotpmail);
        });
    }
}
exports.EmployeeSendOtp = EmployeeSendOtp;
