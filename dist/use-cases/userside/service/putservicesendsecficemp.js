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
exports.User_putserviceSpecificEmp = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class User_putserviceSpecificEmp {
    constructor(servicerepositories, employeerepositoires) {
        this.servicerepositories = servicerepositories;
        this.employeerepositoires = employeerepositoires;
    }
    execute(serivceid, employeeid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("User_putserviceSpecificEmp use case");
            const service = yield this.servicerepositories.findbyId(serivceid);
            if (!service)
                throw new custom_errors_1.CustomError("servicenotfound", 401, error_enum_1.AppError.ResourceNotFound);
            const employee = yield this.employeerepositoires.findById(employeeid);
            if (!employee)
                throw new custom_errors_1.CustomError("employee not found", 401, error_enum_1.AppError.UserNotFound);
            if (service.status === "REJECT") {
                service.mechanics = [];
                service.status = "PENDING";
            }
            const mechanic = {
                employeeId: employeeid,
                bookingDate: new Date(),
                // status:"PENDING"
            };
            // Ensure mechanics array exists before pushing
            if (!Array.isArray(service.mechanics)) {
                service.mechanics = [];
            }
            // Avoid duplicate mechanic entries
            const existingMechanic = service.mechanics.find((m) => m.employeeId.toString() == employeeid);
            console.log(existingMechanic);
            if (!existingMechanic) {
                service.mechanics.push(mechanic);
            }
            else {
                throw new custom_errors_1.CustomError("Employee already assigned", 401, error_enum_1.AppError.DuplicateError);
            }
            // Update the service in the database
            const updatedService = yield this.servicerepositories.findByIdAndUpdateService(service);
            if (!updatedService) {
                throw new custom_errors_1.CustomError("Service update failed", 500, error_enum_1.AppError.ServerError);
            }
            console.log("Service updated successfully");
            return updatedService;
        });
    }
}
exports.User_putserviceSpecificEmp = User_putserviceSpecificEmp;
