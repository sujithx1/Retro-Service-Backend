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
exports.User_Edit_useCase = void 0;
class User_Edit_useCase {
    constructor(userRepositories) {
        this.userRepositories = userRepositories;
    }
    execute(id, username, phone, profilePic) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepositories.findById(id);
            if (!user)
                throw new Error("User id Not Valid");
            user.username = username;
            user.phone = phone;
            if (profilePic) {
                user.profilePic = profilePic;
            }
            const updateUser = yield this.userRepositories.findByIdAndUpdate(user);
            console.log("lassssssssssssssttttttttttttttttttt");
            if (!updateUser)
                throw new Error("User Not Updated");
            return updateUser;
        });
    }
}
exports.User_Edit_useCase = User_Edit_useCase;
