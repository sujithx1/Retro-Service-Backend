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
const EmployeeEntities_1 = require("../../../entities/EmployeeEntities");
const Userentities_1 = require("../../../entities/Userentities");
const EmployeeModel_1 = require("../../../frameworks/db/models/EmployeeModel");
const UserModel_1 = require("../../../frameworks/db/models/UserModel");
class UserMongodbRepositories {
    findByemail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(email);
            const user = yield UserModel_1.UserModel.findOne({ email: email });
            if (!user) {
                return null;
            }
            return new Userentities_1.UserIntities(user.id, user.username, user.email, user.phone, user.password, user.isActive, user.profilePic, user.isAdmin, user.authSource, user.role, user.createdAt, user.updatedAt);
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newuser = yield UserModel_1.UserModel.create(user);
            return new Userentities_1.UserIntities(newuser.id, newuser.username, newuser.email, newuser.phone, newuser.password, newuser.isActive, newuser.profilePic, newuser.isAdmin, newuser.authSource, newuser.role, newuser.createdAt, newuser.updatedAt);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findById(id);
            if (!user)
                return null;
            return new Userentities_1.UserIntities(user.id, user.username, user.email, user.phone, user.password, user.isActive, user.profilePic, user.isAdmin, user.authSource, user.role, user.createdAt, user.updatedAt);
        });
    }
    findByIdAndUpdate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield UserModel_1.UserModel.findByIdAndUpdate(user.id, {
                username: user.username,
                phone: user.phone,
                profilePic: user.profilePic,
            }, { new: true });
            if (!userData)
                return null;
            return new Userentities_1.UserIntities(userData.id, userData.username, userData.email, userData.phone, userData.password, userData.isActive, userData.profilePic, userData.isAdmin, userData.authSource, userData.role, userData.createdAt, userData.updatedAt);
        });
    }
    findByIdAndUpdatePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findByIdAndUpdate(id, { password: password }, { new: true });
            if (!user)
                return null;
        });
    }
    findEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield EmployeeModel_1.EmployeeModel.find();
            return employees.map((item) => new EmployeeEntities_1.EmployeeEntities(item.id, item.username, item.email, item.phone, item.password, item.skills, item.experience, item.isActive, item.profilePic, item.location, item.authSource, item.role, item.createdAt, item.updatedAt));
        });
    }
}
exports.UserMongodbRepositories = UserMongodbRepositories;
