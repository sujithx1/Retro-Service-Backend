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
exports.Admin_get_allUsers_useCase = void 0;
const user_map_1 = require("../../../DTO/map/user.map");
class Admin_get_allUsers_useCase {
    constructor(userRepositoris) {
        this.userRepositoris = userRepositoris;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepositoris.findByall();
            return users.map((item) => user_map_1.UserMap.toResponse(item));
        });
    }
}
exports.Admin_get_allUsers_useCase = Admin_get_allUsers_useCase;
