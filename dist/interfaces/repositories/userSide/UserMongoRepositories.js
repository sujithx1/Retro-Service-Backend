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
exports.UserMongodbRepositories = void 0;
const Userentities_1 = require("../../../entities/Userentities");
const UserModel_1 = require("../../../frameworks/db/models/UserModel");
class UserMongodbRepositories {
    findByemail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findOne({ email: email });
            if (!user) {
                return null;
            }
            return new Userentities_1.UserIntities(user.id, user.username, user.email, user.phone, user.password);
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserModel_1.UserModel.create(user);
        });
    }
}
exports.UserMongodbRepositories = UserMongodbRepositories;
