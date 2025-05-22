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
exports.StoreLoginuseCase = void 0;
const store_map_1 = require("../../../DTO/map/store.map");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
const hashPassword_1 = require("../../../utils/hashPassword");
class StoreLoginuseCase {
    constructor(storeRepositories) {
        this.storeRepositories = storeRepositories;
    }
    execute(storeId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const findstore = yield this.storeRepositories.findbystoreId(storeId);
            if (!findstore)
                throw new custom_errors_1.CustomError("store not found", 401, error_enum_1.AppError.ResourceNotFound);
            if (findstore.isActive == false)
                throw new custom_errors_1.CustomError("store is Blocked", 401, error_enum_1.AppError.UnauthorizedAccess);
            const compare = yield (0, hashPassword_1.comparePassword)(password, findstore.password);
            if (!compare)
                throw new custom_errors_1.CustomError("password not match", 401, error_enum_1.AppError.PasswordNotmatch);
            return store_map_1.StoreMap.toResponse(findstore);
        });
    }
}
exports.StoreLoginuseCase = StoreLoginuseCase;
