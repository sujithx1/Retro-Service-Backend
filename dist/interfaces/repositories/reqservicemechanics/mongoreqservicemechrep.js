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
                { path: 'mechanics', select: 'username id' },
                { path: 'jobId', select: 'name description' }
            ]);
            return new reqserviceEntities_1.RequestserviceMechEntities(req.id, req.userId._id.toString(), req.userName, req.userEmail, req.userLocation, req.jobId._id.toString(), req.jobName, req.minWage, req.problem, req.mechanics, req.status, req.bookingDate);
        });
    }
    findbyempId(empid) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqserviceEmpl = yield reqserviceMechanics_1.Request_Service_Mech_model.find({
                'mechanics.employeeId': empid
            });
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
                var _a;
                const empllist = service.mechanics.map(emp => {
                    // If employeeId is populated (object), return its id
                    if (typeof emp.employeeId === "object" && "_id" in emp.employeeId) {
                        return {
                            employeeId: emp.employeeId._id.toString(),
                            bookingDate: emp.bookingDate
                        };
                    }
                    // If employeeId is a string (ObjectId), return as it is
                    return {
                        employeeId: emp.employeeId,
                        bookingDate: emp.bookingDate
                    };
                });
                const acceptEmployee = service.acceptEmployee && ((_a = service.acceptEmployee.employeeId) === null || _a === void 0 ? void 0 : _a._id)
                    ? {
                        employeeId: service.acceptEmployee.employeeId._id.toString(), // ✅ Extract only _id as string
                        acceptTime: service.acceptEmployee.acceptTime
                    }
                    : null;
                return new reqserviceEntities_1.RequestserviceMechEntities(service._id.toString(), service.userId._id.toString(), service.userId.username, service.userId.email, service.userLocation, service.jobId._id.toString(), service.jobId.name, service.minWage, service.problem, empllist, service.status, service.bookingDate, acceptEmployee, service.paymentId ? service.paymentId : "");
            });
        });
    }
    findbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const reqservice = yield reqserviceMechanics_1.Request_Service_Mech_model.findById(id);
            if (!reqservice)
                return null;
            yield reqservice
                .populate([
                { path: 'userId', select: 'username email id' },
                { path: 'mechanics', select: 'name id' },
                { path: 'jobId', select: 'name description' }
            ]);
            const acceptEmployee = reqservice.acceptEmployee && ((_a = reqservice.acceptEmployee.employeeId) === null || _a === void 0 ? void 0 : _a._id)
                ? {
                    employeeId: reqservice.acceptEmployee.employeeId._id.toString(), // ✅ Extract only _id as string
                    acceptTime: reqservice.acceptEmployee.acceptTime
                }
                : null;
            return new reqserviceEntities_1.RequestserviceMechEntities(reqservice.id, reqservice.userId._id.toString(), reqservice.userName, reqservice.userEmail, reqservice.userLocation, reqservice.jobId._id.toString(), reqservice.jobName, reqservice.minWage, reqservice.problem, reqservice.mechanics, reqservice.status, reqservice.bookingDate, acceptEmployee, reqservice.paymentId ? reqservice.paymentId : "");
        });
    }
    findByIdAndUpdate(reqService, empId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const updateData = {
                status: reqService.status,
                acceptEmployee: {
                    employeeId: empId,
                    acceptTime: new Date()
                }
            };
            if (reqService.paymentId && reqService.paymentId !== "") {
                updateData.paymentId = reqService.paymentId;
            }
            const service = yield reqserviceMechanics_1.Request_Service_Mech_model.findByIdAndUpdate(reqService.id, updateData, {
                new: true,
                upsert: true
            });
            if (!service)
                return null;
            yield service
                .populate([
                { path: 'userId', select: 'username email id' },
                { path: 'mechanics', select: 'name id' },
                { path: 'jobId', select: 'name description' }
            ]);
            const acceptEmployee = service.acceptEmployee && ((_a = service.acceptEmployee.employeeId) === null || _a === void 0 ? void 0 : _a._id)
                ? {
                    employeeId: service.acceptEmployee.employeeId._id.toString(), // ✅ Extract only _id as string
                    acceptTime: service.acceptEmployee.acceptTime
                }
                : null;
            return new reqserviceEntities_1.RequestserviceMechEntities(service.id, service.userId._id.toString(), service.userName, service.userEmail, service.userLocation, service.jobId._id.toString(), service.jobName, service.minWage, service.problem, service.mechanics, service.status, service.bookingDate, acceptEmployee, service.paymentId ? service.paymentId : "");
        });
    }
    findByIdAndUpdateCancellBooking(reqService) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const service = yield reqserviceMechanics_1.Request_Service_Mech_model.findByIdAndUpdate(reqService.id, {
                status: reqService.status
            }, { new: true });
            if (!service)
                return null;
            yield service
                .populate([
                { path: 'userId', select: 'username email id' },
                { path: 'mechanics', select: 'name id' },
                { path: 'jobId', select: 'name description' }
            ]);
            const acceptEmployee = service.acceptEmployee && ((_a = service.acceptEmployee.employeeId) === null || _a === void 0 ? void 0 : _a._id)
                ? {
                    employeeId: service.acceptEmployee.employeeId._id.toString(), // ✅ Extract only _id as string
                    acceptTime: service.acceptEmployee.acceptTime
                }
                : null;
            return new reqserviceEntities_1.RequestserviceMechEntities(service.id, service.userId._id.toString(), service.userName, service.userEmail, service.userLocation, service.jobId._id.toString(), service.jobName, service.minWage, service.problem, service.mechanics, service.status, service.bookingDate, acceptEmployee, service.paymentId ? service.paymentId : "");
        });
    }
    findbyUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqservice = yield reqserviceMechanics_1.Request_Service_Mech_model.find({
                userId: userId
            });
            if (!reqservice || reqservice.length === 0)
                return [];
            // Populate each document individually
            for (let service of reqservice) {
                yield service.populate([
                    { path: 'userId', select: 'username email _id' },
                    { path: 'mechanics', select: 'name _id' },
                    { path: 'jobId', select: 'name description _id' },
                    { path: 'acceptEmployee.employeeId', select: 'name _id' }
                ]);
            }
            return reqservice.map((service) => {
                var _a;
                const empllist = service.mechanics.map((emp) => {
                    // Type guard to check if employeeId is of type IEmployee_types (object)
                    if (emp.employeeId && typeof emp.employeeId !== "string") {
                        return {
                            employeeId: emp.employeeId._id.toString(), // Access _id when it's an object
                            bookingDate: emp.bookingDate, // The bookingDate field
                        };
                    }
                    // If it's a string, handle accordingly (it could be an ObjectId)
                    return {
                        employeeId: emp.employeeId, // Convert ObjectId to string
                        bookingDate: emp.bookingDate,
                    };
                });
                const acceptEmployee = service.acceptEmployee && ((_a = service.acceptEmployee.employeeId) === null || _a === void 0 ? void 0 : _a._id)
                    ? {
                        employeeId: service.acceptEmployee.employeeId._id.toString(), // ✅ Extract only _id as string
                        acceptTime: service.acceptEmployee.acceptTime
                    }
                    : null;
                return new reqserviceEntities_1.RequestserviceMechEntities(service._id.toString(), service.userId._id.toString(), service.userId.username, service.userId.email, service.userLocation, service.jobId._id.toString(), service.jobId.name, service.minWage, service.problem, empllist, service.status, service.bookingDate, acceptEmployee, service.paymentId ? service.paymentId : "");
            });
        });
    }
    findByIdAndUpdateService(service) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedService = yield reqserviceMechanics_1.Request_Service_Mech_model.findByIdAndUpdate(service.id, {
                    $set: { status: service.status, mechanics: service.mechanics, bookingDate: service.bookingDate }, // Updating fields
                }, { new: true });
                if (!updatedService)
                    return null;
                yield updatedService
                    .populate([
                    { path: 'userId', select: 'username email id' },
                    { path: 'mechanics', select: 'name id' },
                    { path: 'jobId', select: 'name description' }
                ]);
                const acceptEmployee = updatedService.acceptEmployee
                    ? {
                        employeeId: updatedService.acceptEmployee.employeeId
                            ? updatedService.acceptEmployee.employeeId.toString()
                            : null,
                        acceptTime: updatedService.acceptEmployee.acceptTime
                    }
                    : null;
                return new reqserviceEntities_1.RequestserviceMechEntities(updatedService.id, updatedService.userId._id.toString(), updatedService.userName, updatedService.userEmail, updatedService.userLocation, updatedService.jobId._id.toString(), updatedService.jobName, updatedService.minWage, updatedService.problem, updatedService.mechanics, updatedService.status, updatedService.bookingDate, acceptEmployee, updatedService.paymentId ? service.paymentId : "");
            }
            catch (error) {
                console.error("Error updating service:", error);
                throw new Error("Failed to update service");
            }
        });
    }
}
exports.MongoReqServiceMechnics = MongoReqServiceMechnics;
