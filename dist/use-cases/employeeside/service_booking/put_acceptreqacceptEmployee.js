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
exports.Accept_reqServiceEmployee = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class Accept_reqServiceEmployee {
    constructor(reqseriveRepositories) {
        this.reqseriveRepositories = reqseriveRepositories;
    }
    execute(id, empId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqservice = yield this.reqseriveRepositories.findbyId(id);
            if (!reqservice)
                throw new custom_errors_1.CustomError("Service not found", 401, error_enum_1.AppError.ResourceNotFound);
            console.log("Mechanics List:", reqservice.mechanics.map(mech => mech));
            console.log("Searching for Employee ID:", empId);
            const mechanic = reqservice.mechanics.find(mech => mech.employeeId == empId);
            if (!mechanic) {
                console.error(`❌ Mechanic with ID ${empId} not found in service mechanics list.`);
                throw new custom_errors_1.CustomError("Mechanic not found in service", 404, error_enum_1.AppError.ResourceNotFound);
            }
            console.log("✅ Mechanic found:", mechanic);
            reqservice.status = status;
            const update = yield this.reqseriveRepositories.findByIdAndUpdate(reqservice, empId);
            if (!update)
                throw new custom_errors_1.CustomError("Not updated", 401, error_enum_1.AppError.ServerError);
            return update;
        });
    }
}
exports.Accept_reqServiceEmployee = Accept_reqServiceEmployee;
