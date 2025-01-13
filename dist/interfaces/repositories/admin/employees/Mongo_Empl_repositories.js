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
exports.Mongo_Admin_Employees_Repositories = void 0;
const EmployeeEntities_1 = require("../../../../entities/EmployeeEntities");
const EmployeeModel_1 = require("../../../../frameworks/db/models/EmployeeModel");
class Mongo_Admin_Employees_Repositories {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield EmployeeModel_1.EmployeeModel.find();
            return employees.length ? employees.map((item) => new EmployeeEntities_1.EmployeeEntities(item.id, item.username, item.email, item.phone, item.password, item.skills, item.experience, item.isActive, item.profilePic, item.location, item.authSource, item.role, item.revenue, item.createdAt, item.updatedAt)) : [];
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findById(id);
            if (!employee)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.revenue, employee.createdAt, employee.updatedAt);
        });
    }
    findByIdAndUpdate(employe) {
        return __awaiter(this, void 0, void 0, function* () {
            const employedata = yield EmployeeModel_1.EmployeeModel.findByIdAndUpdate(employe.id, {
                username: employe.username,
                phone: employe.phone,
                location: employe.location,
                skill: employe.skills,
                experience: employe.experience,
                profilePic: employe.profilePic,
                isActive: employe.isActive
            }, { new: true });
            if (!employedata)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employedata.id, employedata.username, employedata.email, employedata.phone, employedata.password, employedata.skills, employedata.experience, employedata.isActive, employedata.profilePic, employedata.location, employedata.authSource, employedata.role, employedata.revenue, employedata.createdAt, employedata.updatedAt);
        });
    }
}
exports.Mongo_Admin_Employees_Repositories = Mongo_Admin_Employees_Repositories;
