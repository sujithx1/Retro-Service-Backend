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
exports.Admin_put_user_useCase = void 0;
const Userentities_1 = require("../../../entities/Userentities");
class Admin_put_user_useCase {
    constructor(userRepositories) {
        this.userRepositories = userRepositories;
    }
    execute(id, username, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepositories.findById(id);
            if (!user)
                throw new Error("id not matching ");
            user.username = username,
                user.phone = phone;
            const update = yield this.userRepositories.findByIdAndUpdate(user);
            if (!update)
                throw new Error("Not updateded");
            return new Userentities_1.UserIntities(update.id, update.username, update.email, update.phone, update.password, update.isActive, update.profilePic, update.isAdmin, update.authSource, update.role, update.createdAt, update.updatedAt);
        });
    }
}
exports.Admin_put_user_useCase = Admin_put_user_useCase;
