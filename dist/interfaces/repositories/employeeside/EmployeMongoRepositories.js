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
exports.EmployeeMongoRepositories = void 0;
const EmployeeEntities_1 = require("../../../entities/EmployeeEntities");
const EmployeeModel_1 = require("../../../frameworks/db/models/EmployeeModel");
class EmployeeMongoRepositories {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findOne({ email: email });
            if (!employee)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.revenue, employee.onDuty, employee.createdAt, employee.updatedAt);
        });
    }
    save(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmploye = yield EmployeeModel_1.EmployeeModel.create(employee);
            return new EmployeeEntities_1.EmployeeEntities(newEmploye.id, newEmploye.username, newEmploye.email, newEmploye.phone, newEmploye.password, newEmploye.skills, newEmploye.experience);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findById(id);
            if (!employee)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.revenue, employee.onDuty, employee.createdAt, employee.updatedAt);
        });
    }
    findByIdAndUpdate(emmployee) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findByIdAndUpdate(emmployee.id, {
                username: emmployee.username,
                phone: emmployee.phone,
                profilePic: emmployee.profilePic,
                skills: emmployee.skills,
                experience: emmployee.experience,
                location: emmployee.location,
            }, { new: true });
            if (!employee)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.revenue, employee.onDuty, employee.createdAt, employee.updatedAt);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield EmployeeModel_1.EmployeeModel.find();
            return employees.length ? employees.map((item) => new EmployeeEntities_1.EmployeeEntities(item.id, item.username, item.email, item.phone, item.password, item.skills, item.experience, item.isActive, item.profilePic, item.location, item.authSource, item.role, item.revenue, item.onDuty, item.createdAt, item.updatedAt)) : [];
        });
    }
    findIdAndUpdateRevenue(id, revenue) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findByIdAndUpdate(id, { $inc: { revenue: revenue } }, // Increment the revenue field
            { new: true } // Return the updated document
            );
            if (!employee)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.revenue, employee.onDuty, employee.createdAt, employee.updatedAt);
        });
    }
    findByIdAndUpdatePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findByIdAndUpdate(id, { password: password }, { new: true });
            if (!employee)
                return null;
        });
    }
    findByIdAndonDutyupdate(id, duty) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findByIdAndUpdate(id, {
                onDuty: duty
            }, { new: true });
            if (!employee)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.revenue, employee.onDuty, employee.createdAt, employee.updatedAt);
        });
    }
    findByIdAndUpdatelocation(id, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findByIdAndUpdate(id, {
                location: location
            }, { new: true, upsert: true });
            if (!employee)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.revenue, employee.onDuty, employee.createdAt, employee.updatedAt);
        });
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        return __awaiter(this, void 0, void 0, function* () {
            const toRad = (value) => (value * Math.PI) / 180;
            const R = 6371; // Radius of Earth in km
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        });
    }
    ;
    findempnearestWithOnduty(userLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find employees who are on duty and have a location
                const employees = yield EmployeeModel_1.EmployeeModel.find({
                    onDuty: true,
                    'location.lat': { $exists: true },
                    'location.lng': { $exists: true },
                });
                // Map employees to include calculated distances and filter by 5 km radius
                const employeesWithDistances = yield Promise.all(employees.map((employee) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    const distance = (((_a = employee.location) === null || _a === void 0 ? void 0 : _a.lat) && ((_b = employee.location) === null || _b === void 0 ? void 0 : _b.lng))
                        ? yield this.calculateDistance(userLocation.lat, userLocation.lng, employee.location.lat, employee.location.lng)
                        : Infinity; // If location is missing, set to Infinity
                    return {
                        employee,
                        distance
                    };
                })));
                // Filter employees who are within 5 km
                const nearbyEmployees = employeesWithDistances.filter(item => item.distance <= 5);
                // Sort employees by proximity to the user's location
                const sortedEmployees = nearbyEmployees.sort((a, b) => a.distance - b.distance);
                // Return the sorted list of employees wrapped in EmployeeEntities
                return sortedEmployees.length
                    ? sortedEmployees.map((item) => new EmployeeEntities_1.EmployeeEntities(item.employee.id, item.employee.username, item.employee.email, item.employee.phone, item.employee.password, item.employee.skills, item.employee.experience, item.employee.isActive, item.employee.profilePic, item.employee.location, item.employee.authSource, item.employee.role, item.employee.revenue, item.employee.onDuty, item.employee.createdAt, item.employee.updatedAt))
                    : []; // Return empty array if no employees found
            }
            catch (error) {
                console.error('Error fetching employees:', error);
                throw new Error('Failed to fetch employees');
            }
        });
    }
    findempnearest10km(userLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield EmployeeModel_1.EmployeeModel.find({
                'location.lat': { $exists: true },
                'location.lng': { $exists: true },
            });
            // Map employees to include calculated distances and filter by 5 km radius
            const employeesWithDistances = yield Promise.all(employees.map((employee) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const distance = (((_a = employee.location) === null || _a === void 0 ? void 0 : _a.lat) && ((_b = employee.location) === null || _b === void 0 ? void 0 : _b.lng))
                    ? yield this.calculateDistance(userLocation.lat, userLocation.lng, employee.location.lat, employee.location.lng)
                    : Infinity; // If location is missing, set to Infinity
                return {
                    employee,
                    distance
                };
            })));
            // Filter employees who are within 5 km
            const nearbyEmployees = employeesWithDistances.filter(item => item.distance <= 10);
            return nearbyEmployees.length
                ? nearbyEmployees.map((item) => new EmployeeEntities_1.EmployeeEntities(item.employee.id, item.employee.username, item.employee.email, item.employee.phone, item.employee.password, item.employee.skills, item.employee.experience, item.employee.isActive, item.employee.profilePic, item.employee.location, item.employee.authSource, item.employee.role, item.employee.revenue, item.employee.onDuty, item.employee.createdAt, item.employee.updatedAt))
                : []; // Return empty array if no employees found
        });
    }
    findIdAndDecrementRevenue(id, revenue) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel_1.EmployeeModel.findByIdAndUpdate(id, { $inc: { revenue: -Math.abs(revenue) } }, // Increment the revenue field
            { new: true } // Return the updated document
            );
            if (!employee)
                return null;
            return new EmployeeEntities_1.EmployeeEntities(employee.id, employee.username, employee.email, employee.phone, employee.password, employee.skills, employee.experience, employee.isActive, employee.profilePic, employee.location, employee.authSource, employee.role, employee.revenue, employee.onDuty, employee.createdAt, employee.updatedAt);
        });
    }
}
exports.EmployeeMongoRepositories = EmployeeMongoRepositories;
