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
exports.Admin_del_employee_useCase = void 0;
const EmployeeEntities_1 = require("../../../entities/EmployeeEntities");
class Admin_del_employee_useCase {
    constructor(employeerepositories) {
        this.employeerepositories = employeerepositories;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeerepositories.findById(id);
            if (!employee)
                throw new Error('id is not matching ');
            employee.isActive = !employee.isActive;
            const update = yield this.employeerepositories.findByIdAndUpdate(employee);
            if (!update)
                throw new Error("not updated");
            console.log(update);
            return new EmployeeEntities_1.EmployeeEntities(update.id, update.username, update.email, update.phone, update.password, update.skills, update.experience, update.isValidated, update.proof, update.isActive, update.profilePic, update.location, update.authSource, update.role, update.revenue, update.onDuty, update.createdAt, update.updatedAt);
        });
    }
}
exports.Admin_del_employee_useCase = Admin_del_employee_useCase;
