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
exports.Employee_get_details_useCase = void 0;
const mechanic_map_1 = require("../../DTO/map/mechanic.map");
class Employee_get_details_useCase {
    constructor(employeeRep) {
        this.employeeRep = employeeRep;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRep.findById(id);
            if (!employee)
                throw new Error("No employee");
            return mechanic_map_1.MechanicMap.toResponse(employee);
        });
    }
}
exports.Employee_get_details_useCase = Employee_get_details_useCase;
