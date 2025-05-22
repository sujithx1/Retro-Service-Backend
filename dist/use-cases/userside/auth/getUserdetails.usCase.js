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
exports.User_getdetails = void 0;
const user_map_1 = require("../../../DTO/map/user.map");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class User_getdetails {
    constructor(userrepositories) {
        this.userrepositories = userrepositories;
    }
    execute(useId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userrepositories.findById(useId);
            if (!user)
                throw new custom_errors_1.CustomError("user not found", 401, error_enum_1.AppError.UserNotFound);
            return user_map_1.UserMap.toResponse(user);
        });
    }
}
exports.User_getdetails = User_getdetails;
