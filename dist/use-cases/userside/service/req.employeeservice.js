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
exports.ReqEmployeeServices_useCase = void 0;
const reqserviceEntities_1 = require("../../../entities/reqserviceEntities");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class ReqEmployeeServices_useCase {
    constructor(userRepositories, employeeRepositoires, reqServicesRepositories) {
        this.userRepositories = userRepositories;
        this.employeeRepositoires = employeeRepositoires;
        this.reqServicesRepositories = reqServicesRepositories;
    }
    execute(userId, userEmail, userName, userLocation, jobId, jobName, Min_wage, problem) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepositories.findById(userId);
            if (!user)
                throw new custom_errors_1.CustomError("User not found", 401, error_enum_1.AppError.UserNotFound);
            const employees = yield this.employeeRepositoires.findAll();
            const emplist = employees.map(emp => emp.id);
            const newReqs = new reqserviceEntities_1.RequestserviceMechEntities("", userId, userName, userEmail, userLocation, jobId, jobName, Min_wage, problem, emplist, "PENDING", new Date());
            return yield this.reqServicesRepositories.create(newReqs);
        });
    }
}
exports.ReqEmployeeServices_useCase = ReqEmployeeServices_useCase;
