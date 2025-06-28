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
exports.UserLocation_useCase = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class UserLocation_useCase {
    constructor(userrepositories) {
        this.userrepositories = userrepositories;
    }
    execute(id, lat, lng, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userrepositories.findById(id);
            if (!user)
                throw new custom_errors_1.CustomError("user not found ", 401, error_enum_1.AppError.UserNotFound);
            const update = yield this.userrepositories.findByIdAndUpdatelocation(id, { lat, lng, address });
            if (!(update === null || update === void 0 ? void 0 : update.location))
                throw new custom_errors_1.CustomError("not Updated", 401, error_enum_1.AppError.ServerError);
            return update.location;
        });
    }
}
exports.UserLocation_useCase = UserLocation_useCase;
