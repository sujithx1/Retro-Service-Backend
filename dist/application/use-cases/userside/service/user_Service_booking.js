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
exports.User_Post_Service_booking_useCase = void 0;
const ServiceEntities_1 = require("../../../entities/ServiceEntities");
class User_Post_Service_booking_useCase {
    constructor(serviceRep, userRep, jobRep, EmpRep) {
        this.serviceRep = serviceRep;
        this.userRep = userRep;
        this.jobRep = jobRep;
        this.EmpRep = EmpRep;
    }
    execute(userId, EmpId, jobId, userLocation, ServiceMin_wage, problem) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRep.findById(userId);
            if (!user)
                throw new Error("User Id  Not Valid");
            const employee = yield this.EmpRep.findById(EmpId);
            if (!employee)
                throw new Error("Employee Id  Not Valid");
            const job = yield this.jobRep.jobsFindbyId(jobId);
            if (!job)
                throw new Error("job Not Valid");
            console.log("all ok");
            const serviceData = new ServiceEntities_1.ServiceEntities("", user.id, employee.id, job.id, userLocation, "PENDING", new Date(), ServiceMin_wage, problem);
            console.log(serviceData);
            const service = yield this.serviceRep.create(serviceData);
            return service;
        });
    }
}
exports.User_Post_Service_booking_useCase = User_Post_Service_booking_useCase;
