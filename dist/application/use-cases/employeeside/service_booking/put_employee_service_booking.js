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
exports.Employee_put_Service_booking_useCase = void 0;
class Employee_put_Service_booking_useCase {
    constructor(serviceBookingrep) {
        this.serviceBookingrep = serviceBookingrep;
    }
    execute(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield this.serviceBookingrep.findbyId(id);
            if (!service)
                throw new Error("Service Not Found");
            service.status = status;
            const update = yield this.serviceBookingrep.findbyIdAndUpdate(service);
            if (!update)
                throw new Error("not updated");
            return update;
        });
    }
}
exports.Employee_put_Service_booking_useCase = Employee_put_Service_booking_useCase;
