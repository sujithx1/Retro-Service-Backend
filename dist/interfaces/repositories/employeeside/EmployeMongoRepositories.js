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
exports.EmployeeMongoRepositories = void 0;
const EmployeeEntities_1 = require("../../../entities/EmployeeEntities");
const EmployeeModel_1 = require("../../../frameworks/db/models/EmployeeModel");
class EmployeeMongoRepositories {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findOne({ email: email });
            if (!employee)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.createdAt, employee.updatedAt);
        });
    }
    save(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmploye = yield EmployeeModel_1.EmployeeModel.create(employee);
            return new EmployeeEntities_1.EmployeeEntities(newEmploye.id, newEmploye.username, newEmploye.email, newEmploye.phone, newEmploye.password, newEmploye.skills, newEmploye.experience);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findById(id);
            if (!employee)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.createdAt, employee.updatedAt);
        });
    }
    findByIdAndUpdate(emmployee) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findByIdAndUpdate(emmployee.id, {
                username: emmployee.username,
                phone: emmployee.phone,
                profilePic: emmployee.profilePic,
                skills: emmployee.skills,
                experience: emmployee.experience,
                location: emmployee.location
            }, { new: true });
            if (!employee)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.createdAt, employee.updatedAt);
        });
    }
}
exports.EmployeeMongoRepositories = EmployeeMongoRepositories;
