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
exports.Emp_Login_useCase = void 0;
const EmployeeEntities_1 = require("../../entities/EmployeeEntities");
const hashPassword_1 = require("../../utils/hashPassword");
class Emp_Login_useCase {
    constructor(employeeRespositories) {
        this.employeeRespositories = employeeRespositories;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRespositories.findByEmail(email);
            if (!employee)
                throw new Error("Email not registerd");
            if (employee.isActive == false)
                throw new Error("Employee is Blocked");
            const compare = yield (0, hashPassword_1.comparePassword)(password, employee.password);
            if (!compare)
                throw new Error("Password not matched");
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.revenue, employee.onDuty, employee.createdAt, employee.updatedAt);
        });
    }
}
exports.Emp_Login_useCase = Emp_Login_useCase;
