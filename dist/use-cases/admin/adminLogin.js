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
exports.AdminLogin = void 0;
const hashPassword_1 = require("../../utils/hashPassword");
const AdminEntities_1 = require("../../entities/AdminEntities");
const custom_errors_1 = require("../../utils/errors/custom.errors");
const error_enum_1 = require("../../utils/errors/error.enum");
class AdminLogin {
    constructor(adminrepositories) {
        this.adminrepositories = adminrepositories;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminrepositories.findByemail(email);
            console.log(admin);
            if (!admin || !admin.isAdmin) {
                throw new custom_errors_1.CustomError("Your not Admin", 401, error_enum_1.AppError.InvalidCredentials);
            }
            const compare = yield (0, hashPassword_1.comparePassword)(password, admin.password);
            if (!compare)
                throw new custom_errors_1.CustomError("password not matching", 401, error_enum_1.AppError.InvalidCredentials);
            return new AdminEntities_1.AdminEntities(admin.id, admin.username, admin.email, admin.phone, admin.password, admin.isActive, admin.profilePic, admin.isAdmin, admin.authSource, admin.role, admin.createdAt, admin.updatedAt);
        });
    }
    getAlluser() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminrepositories.findAllUsers();
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminrepositories.findAllEmployees();
        });
    }
    getAllJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminrepositories.findAllJobs();
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminrepositories.findAllCategories();
        });
    }
}
exports.AdminLogin = AdminLogin;
