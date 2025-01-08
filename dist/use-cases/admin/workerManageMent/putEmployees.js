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
exports.Admin_put_employee_useCase = void 0;
const EmployeeEntities_1 = require("../../../entities/EmployeeEntities");
class Admin_put_employee_useCase {
    constructor(employeeRepositories) {
        this.employeeRepositories = employeeRepositories;
    }
    execute(id, username, phone, location, skills, experience) {
        return __awaiter(this, void 0, void 0, function* () {
            const employe = yield this.employeeRepositories.findById(id);
            if (!employe)
                throw new Error("id not matching ");
            employe.username = username,
                employe.phone = phone,
                employe.location = location,
                employe.skills = skills,
                employe.experience = experience;
            const update = yield this.employeeRepositories.findByIdAndUpdate(employe);
            if (!update)
                throw new Error("Not updateded");
            return new EmployeeEntities_1.EmployeeEntities(update.id, update.username, update.email, update.phone, update.password, update.skills, update.experience, update.isActive, update.profilePic, update.location, update.authSource, update.role, update.createdAt, update.updatedAt);
        });
    }
}
exports.Admin_put_employee_useCase = Admin_put_employee_useCase;
