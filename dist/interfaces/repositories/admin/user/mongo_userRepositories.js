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
exports.Mongo_admin_user_Repositories = void 0;
const Userentities_1 = require("../../../../entities/Userentities");
const UserModel_1 = require("../../../../frameworks/db/models/UserModel");
class Mongo_admin_user_Repositories {
    findByall() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserModel_1.UserModel.find();
            return users.length ? users
                .filter((item) => !item.isAdmin)
                .map((item) => new Userentities_1.UserIntities(item.id, item.username, item.email, item.phone, item.password, item.isActive, item.profilePic, item.isAdmin, item.authSource, item.role, item.location, item.createdAt, item.updatedAt)) : [];
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findById(id);
            if (!user)
                return null;
            return new Userentities_1.UserIntities(user.id, user.username, user.email, user.phone, user.password, user.isActive, user.profilePic, user.isAdmin, user.authSource, user.role, user.location, user.createdAt, user.updatedAt);
        });
    }
    findByIdAndUpdate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield UserModel_1.UserModel.findByIdAndUpdate(user.id, {
                username: user.username,
                phone: user.phone,
                profilePic: user.profilePic,
                isActive: user.isActive
            }, { new: true });
            if (!userData)
                return null;
            return new Userentities_1.UserIntities(userData.id, userData.username, userData.email, userData.phone, userData.password, userData.isActive, userData.profilePic, userData.isAdmin, userData.authSource, userData.role, userData.location, userData.createdAt, userData.updatedAt);
        });
    }
}
exports.Mongo_admin_user_Repositories = Mongo_admin_user_Repositories;
