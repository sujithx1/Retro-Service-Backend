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
const mechanic_map_1 = require("../../DTO/map/mechanic.map");
const EmployeeEntities_1 = require("../../entities/EmployeeEntities");
const walletEntities_1 = require("../../entities/walletEntities");
const hashPassword_1 = require("../../utils/hashPassword");
class EmployeeSignup {
    constructor(employeRepositories, walletrepositories) {
        this.employeRepositories = employeRepositories;
        this.walletrepositories = walletrepositories;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, phone, password, skills, experience, proof } = data;
            const hashPassword = yield (0, hashPassword_1.hashpass)(password);
            const employee = new EmployeeEntities_1.EmployeeEntities("", username, email, phone, hashPassword, skills, experience, false, proof);
            const newEmployee = yield this.employeRepositories.save(employee);
            const wallet = new walletEntities_1.WalletEntities("", newEmployee.id, "employee", 0);
            this.walletrepositories.create(wallet);
            return mechanic_map_1.MechanicMap.toResponse(newEmployee);
        });
    }
}
exports.EmployeeSignup = EmployeeSignup;
