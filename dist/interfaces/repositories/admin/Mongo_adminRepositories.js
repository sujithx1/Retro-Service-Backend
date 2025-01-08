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
exports.MongoAdminRepositories = void 0;
const CategoryEntities_1 = require("../../../entities/CategoryEntities");
const EmployeeEntities_1 = require("../../../entities/EmployeeEntities");
const JobsEntities_1 = require("../../../entities/JobsEntities");
const Userentities_1 = require("../../../entities/Userentities");
const Category_Model_1 = require("../../../frameworks/db/models/Category_Model");
const EmployeeModel_1 = require("../../../frameworks/db/models/EmployeeModel");
const JobsModal_1 = require("../../../frameworks/db/models/JobsModal");
const UserModel_1 = require("../../../frameworks/db/models/UserModel");
class MongoAdminRepositories {
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
            return new Userentities_1.UserIntities(newuser.id, newuser.username, newuser.email, newuser.phone, newuser.password);
        });
    }
    findAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield Category_Model_1.CategoryModel.find();
            return categories.length ? categories.map((item) => new CategoryEntities_1.CategoryEntities(item.id, item.name, item.description, item.isBlock)) : [];
        });
    }
    findAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield EmployeeModel_1.EmployeeModel.find();
            return employees.length ? employees.map((item) => new EmployeeEntities_1.EmployeeEntities(item.id, item.username, item.email, item.phone, item.password, item.skills, item.experience, item.isActive, item.profilePic, item.location, item.authSource, item.role, item.createdAt, item.updatedAt)) : [];
        });
    }
    findAllJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield JobsModal_1.JobModel.find();
            return jobs.length ? jobs.map((item) => new JobsEntities_1.JobsEntities(item.id, item.name, item.description, item.minimum_wage, item.isBlock)) : [];
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserModel_1.UserModel.find();
            return users.length ? users.map((item) => new Userentities_1.UserIntities(item.id, item.username, item.email, item.phone, item.password, item.isActive, item.profilePic, item.isAdmin, item.authSource)) : [];
        });
    }
}
exports.MongoAdminRepositories = MongoAdminRepositories;
