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
exports.Mongo_Service_Booking_Repositories = void 0;
const ServiceEntities_1 = require("../../../entities/ServiceEntities");
const ServiceBooking_1 = require("../../../frameworks/db/models/ServiceBooking");
class Mongo_Service_Booking_Repositories {
    findbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield ServiceBooking_1.Service_BookingModel.findById(id)
                .populate({ path: 'user', select: 'username email' })
                .populate({ path: 'employee', select: 'location role' })
                .populate({ path: 'job', select: 'title description' });
            if (!service)
                return null;
            return new ServiceEntities_1.ServiceEntities(service.id, service.user.id.toString(), service.employee.id.toString(), service.job.id.toString(), service.userLocation, service.status, service.bookingDate, service.service_minWage, service.problem);
        });
    }
    create(service) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const services = yield ServiceBooking_1.Service_BookingModel.create({
                user: service.userId,
                employee: service.employeeId,
                job: service.jobId,
                userLocation: service.userLocation,
                bookingDate: service.bookingDate,
                service_minWage: service.service_Minwage,
                problem: service.problem
            });
            yield services.populate({ path: 'user', select: 'username email' });
            yield services.populate({ path: 'employee', select: 'name role' });
            yield services.populate({ path: 'job', select: 'name description' });
            return new ServiceEntities_1.ServiceEntities(services.id, services.user.id.toString(), services.employee.id.toString(), services.job.id.toString(), services.userLocation, services.status, services.bookingDate, services.service_minWage, services.problem, services.user.username, services.employee.username, services.job.name, services.user.profilePic, (_a = services.employee.location) === null || _a === void 0 ? void 0 : _a.address.suburb, services.user.phone);
        });
    }
    findByEmployee(empid) {
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield ServiceBooking_1.Service_BookingModel.find({ employee: empid })
                .populate({ path: 'user' })
                .populate({ path: 'employee' })
                .populate({ path: 'job' });
            return services.map((service) => {
                var _a;
                return new ServiceEntities_1.ServiceEntities(service.id, service.user.id, service.employee.id, service.job.id, service.userLocation, service.status, service.bookingDate, service.service_minWage, service.problem, service.user.username, service.employee.username, service.job.name, service.user.profilePic, (_a = service.employee.location) === null || _a === void 0 ? void 0 : _a.address.suburb, service.user.phone);
            });
        });
    }
    findbyIdAndUpdate(service) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const update = yield ServiceBooking_1.Service_BookingModel.findByIdAndUpdate(service.id, Object.assign({}, service), { new: true })
                .populate({ path: 'user' })
                .populate({ path: 'employee' })
                .populate({ path: 'job' });
            if (!update)
                return null;
            return new ServiceEntities_1.ServiceEntities(update.id, update.user.id, update.employee.id, update.job.id, update.userLocation, update.status, update.bookingDate, update.service_minWage, update.problem, update.user.username, update.employee.username, update.job.name, (_a = update.employee.location) === null || _a === void 0 ? void 0 : _a.address.suburb, update.user.phone);
        });
    }
}
exports.Mongo_Service_Booking_Repositories = Mongo_Service_Booking_Repositories;
