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
exports.User_putReqserviceUsecase = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class User_putReqserviceUsecase {
    constructor(reqserviceRepositories) {
        this.reqserviceRepositories = reqserviceRepositories;
    }
    execute(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqService = yield this.reqserviceRepositories.findbyId(id);
            if (!reqService)
                throw new custom_errors_1.CustomError("Invalid id", 401, error_enum_1.AppError.ResourceNotFound);
            reqService.status = status;
            const update = yield this.reqserviceRepositories.findByIdAndUpdateCancellBooking(reqService);
            if (!update)
                throw new custom_errors_1.CustomError("Not updated", 401, error_enum_1.AppError.InvalidCredentials);
            return update;
        });
    }
}
exports.User_putReqserviceUsecase = User_putReqserviceUsecase;
