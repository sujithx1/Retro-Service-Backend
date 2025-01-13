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
exports.User_getReqServiceuseCase = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class User_getReqServiceuseCase {
    constructor(reqServiceRepositories) {
        this.reqServiceRepositories = reqServiceRepositories;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqService = yield this.reqServiceRepositories.findbyId(id);
            if (!reqService)
                throw new custom_errors_1.CustomError("Service Not found", 401, error_enum_1.AppError.ResourceNotFound);
            return reqService;
        });
    }
}
exports.User_getReqServiceuseCase = User_getReqServiceuseCase;
