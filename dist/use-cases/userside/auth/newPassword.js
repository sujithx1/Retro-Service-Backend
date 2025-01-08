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
exports.NewPassword = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
const hashPassword_1 = require("../../../utils/hashPassword");
class NewPassword {
    constructor(userRep) {
        this.userRep = userRep;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRep.findByemail(email);
            if (!user)
                throw new custom_errors_1.CustomError("User Not found", 404, error_enum_1.AppError.UserNotFound);
            const hash = yield (0, hashPassword_1.hashpass)(password);
            yield this.userRep.findByIdAndUpdatePassword(user.id, hash);
            return true;
        });
    }
}
exports.NewPassword = NewPassword;
