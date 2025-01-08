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
exports.EmployeeSignup = void 0;
const EmployeeEntities_1 = require("../../entities/EmployeeEntities");
const hashPassword_1 = require("../../utils/hashPassword");
class EmployeeSignup {
    constructor(employeRepositories) {
        this.employeRepositories = employeRepositories;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, phone, password, skills, experience } = data;
            const hashPassword = yield (0, hashPassword_1.hashpass)(password);
            const employee = new EmployeeEntities_1.EmployeeEntities("", username, email, phone, hashPassword, skills, experience);
            const newEmployee = yield this.employeRepositories.save(employee);
            return newEmployee;
        });
    }
}
exports.EmployeeSignup = EmployeeSignup;
