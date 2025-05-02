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
const pushNotification_1 = require("../../../firebase/pushNotification");
class ReqEmployeeServices_useCase {
    constructor(userRepositories, employeeRepositoires, reqServicesRepositories) {
        this.userRepositories = userRepositories;
        this.employeeRepositoires = employeeRepositoires;
        this.reqServicesRepositories = reqServicesRepositories;
    }
    execute(userId, userEmail, userName, userLocation, jobId, jobName, Min_wage, problem) {
        return __awaiter(this, void 0, void 0, function* () {
            // const user=await this.userRepositories.findById(userId)
            // if(!user) throw new CustomError("User not found",401,AppError.UserNotFound)
            const employees = yield this.employeeRepositoires.findempnearestWithOnduty(userLocation);
            const mechanics = employees.map(emp => ({
                employeeId: emp.id,
                bookingDate: new Date(),
            }));
            const newReqs = new reqserviceEntities_1.RequestserviceMechEntities("", userId, userName, userEmail, userLocation, jobId, jobName, Min_wage, problem, mechanics, "PENDING", new Date());
            const tokens = employees
                .map(emp => emp.FCM_token)
                .filter((token) => typeof token === 'string');
            const uniqueTokens = Array.from(new Set(tokens));
            yield (0, pushNotification_1.notifyMechanics)(uniqueTokens);
            return yield this.reqServicesRepositories.create(newReqs);
        });
    }
}
exports.ReqEmployeeServices_useCase = ReqEmployeeServices_useCase;
