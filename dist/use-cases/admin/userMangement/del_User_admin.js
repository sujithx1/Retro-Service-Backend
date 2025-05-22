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
exports.admin_Block_UnBlock_User_useCase = void 0;
const user_map_1 = require("../../../DTO/map/user.map");
class admin_Block_UnBlock_User_useCase {
    constructor(userRepositories) {
        this.userRepositories = userRepositories;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepositories.findById(id);
            if (!user)
                throw new Error("id is not matching ");
            user.isActive = !user.isActive;
            const update = yield this.userRepositories.findByIdAndUpdate(user);
            if (!update)
                throw new Error("not updated");
            console.log(update);
            return user_map_1.UserMap.toResponse(update);
        });
    }
}
exports.admin_Block_UnBlock_User_useCase = admin_Block_UnBlock_User_useCase;
