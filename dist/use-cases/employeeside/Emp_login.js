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
const mechanic_map_1 = require("../../DTO/map/mechanic.map");
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
            if (employee.isValidated === false)
                throw new Error("Employee is not Verified");
            if (employee.isActive == false)
                throw new Error("Employee is Blocked");
            const compare = yield (0, hashPassword_1.comparePassword)(password, employee.password);
            if (!compare)
                throw new Error("Password not matched");
            return mechanic_map_1.MechanicMap.toResponse(employee);
        });
    }
}
exports.Emp_Login_useCase = Emp_Login_useCase;
