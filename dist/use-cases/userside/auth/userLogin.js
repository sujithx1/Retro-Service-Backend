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
exports.UserLogin = void 0;
const user_map_1 = require("../../../DTO/map/user.map");
// import { IwalletRepositories } from "../../../interfaces/repositories/wallet/Iwalletrepositories";
const hashPassword_1 = require("../../../utils/hashPassword");
class UserLogin {
    constructor(userRepositories) {
        this.userRepositories = userRepositories;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepositories.findByemail(email);
            if (!user)
                throw new Error("Email not Valid");
            console.log(user.password);
            if (user.isActive == false)
                throw new Error("user is Blocked");
            const compare = yield (0, hashPassword_1.comparePassword)(password, user.password);
            if (!compare)
                throw new Error("password not matched");
            console.log("login success");
            // return new UserIntities(user.id,user.username,user.email,user.phone,user.password,user.isActive,user.profilePic,
            //     user.isAdmin,user.authSource,user.role
            // )
            return user_map_1.UserMap.toResponse(user);
        });
    }
}
exports.UserLogin = UserLogin;
