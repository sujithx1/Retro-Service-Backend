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
exports.MongoReqServiceMechnics = void 0;
const reqserviceEntities_1 = require("../../../entities/reqserviceEntities");
const reqserviceMechanics_1 = require("../../../frameworks/db/models/reqserviceMechanics");
class MongoReqServiceMechnics {
    create(services) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield reqserviceMechanics_1.Request_Service_Mech_model.create(services);
            yield req
                .populate([
                { path: 'userId', select: 'username email id' },
                { path: 'mechanics', select: 'name id' },
                { path: 'jobId', select: 'name description' }
            ]);
            const empllist = req.mechanics.map(emp => {
                if ('id' in emp) {
                    return emp.id;
                }
                return emp.toString();
            });
            return new reqserviceEntities_1.RequestserviceMechEntities(req.id, req.userId._id.toString(), req.userName, req.userEmail, req.userLocation, req.jobId._id.toString(), req.jobName, req.minWage, req.problem, empllist, req.status, req.bookingDate);
        });
    }
    findbyempId(empid) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqserviceEmpl = yield reqserviceMechanics_1.Request_Service_Mech_model.find({
                mechanics: empid
            });
            console.log("reqservices", reqserviceEmpl);
            if (!reqserviceEmpl || reqserviceEmpl.length === 0)
                return [];
            // Populate each document individually
            for (let service of reqserviceEmpl) {
                yield service.populate([
                    { path: 'userId', select: 'username email _id' },
                    { path: 'mechanics', select: 'name _id' },
                    { path: 'jobId', select: 'name description _id' },
                    { path: 'acceptEmployee.employeeId', select: 'name _id' }
                ]);
            }
            return reqserviceEmpl.map((service) => {
                const empllist = service.mechanics.map(emp => {
                    if ('_id' in emp) {
                        return emp._id.toString();
                    }
                    return emp.toString();
                });
                const acceptEmployee = service.acceptEmployee
                    ? {
                        employeeId: service.acceptEmployee.employeeId
                            ? service.acceptEmployee.employeeId.toString()
                            : null,
                        acceptTime: service.acceptEmployee.acceptTime
                    }
                    : null;
                return new reqserviceEntities_1.RequestserviceMechEntities(service._id.toString(), service.userId._id.toString(), service.userId.username, service.userId.email, service.userLocation, service.jobId._id.toString(), service.jobId.name, service.minWage, service.problem, empllist, service.status, service.bookingDate, acceptEmployee);
            });
        });
    }
    findbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqservice = yield reqserviceMechanics_1.Request_Service_Mech_model.findById(id);
            if (!reqservice)
                return null;
            yield reqservice
                .populate([
                { path: 'userId', select: 'username email id' },
                { path: 'mechanics', select: 'name id' },
                { path: 'jobId', select: 'name description' }
            ]);
            const empllist = reqservice.mechanics.map(emp => {
                if ('id' in emp) {
                    return emp.id;
                }
                return emp.toString();
            });
            const acceptEmployee = reqservice.acceptEmployee
                ? {
                    employeeId: reqservice.acceptEmployee.employeeId
                        ? reqservice.acceptEmployee.employeeId.toString()
                        : null,
                    acceptTime: reqservice.acceptEmployee.acceptTime
                }
                : null;
            return new reqserviceEntities_1.RequestserviceMechEntities(reqservice.id, reqservice.userId._id.toString(), reqservice.userName, reqservice.userEmail, reqservice.userLocation, reqservice.jobId._id.toString(), reqservice.jobName, reqservice.minWage, reqservice.problem, empllist, reqservice.status, reqservice.bookingDate, acceptEmployee);
        });
    }
    findByIdAndUpdate(reqService, empId) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield reqserviceMechanics_1.Request_Service_Mech_model.findByIdAndUpdate(reqService.id, {
                status: reqService.status,
                $set: {
                    "acceptEmployee": {
                        employeeId: empId,
                        acceptTime: new Date() // Set acceptTime to current date and time
                    }
                }
            }, {
                new: true, upsert: true
            });
            if (!service)
                return null;
            yield service
                .populate([
                { path: 'userId', select: 'username email id' },
                { path: 'mechanics', select: 'name id' },
                { path: 'jobId', select: 'name description' }
            ]);
            const empllist = service.mechanics.map(emp => {
                if ('id' in emp) {
                    return emp.id;
                }
                return emp.toString();
            });
            const acceptEmployee = service.acceptEmployee
                ? {
                    employeeId: service.acceptEmployee.employeeId
                        ? service.acceptEmployee.employeeId.toString()
                        : null,
                    acceptTime: service.acceptEmployee.acceptTime
                }
                : null;
            return new reqserviceEntities_1.RequestserviceMechEntities(service.id, service.userId._id.toString(), service.userName, service.userEmail, service.userLocation, service.jobId._id.toString(), service.jobName, service.minWage, service.problem, empllist, service.status, service.bookingDate, acceptEmployee);
        });
    }
}
exports.MongoReqServiceMechnics = MongoReqServiceMechnics;
