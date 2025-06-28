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
exports.Employee_put_Profile_useCase = void 0;
const mechanic_map_1 = require("../../../DTO/map/mechanic.map");
class Employee_put_Profile_useCase {
    constructor(employeeRep) {
        this.employeeRep = employeeRep;
    }
    execute(id, username, phone, profilePic, experience) {
        return __awaiter(this, void 0, void 0, function* () {
            const employe = yield this.employeeRep.findById(id);
            if (!employe)
                throw new Error("no employee found");
            employe.username = username;
            employe.phone = phone;
            employe.profilePic = profilePic;
            employe.experience = experience;
            const update = yield this.employeeRep.findByIdAndUpdate(employe);
            if (!update)
                throw new Error("employee not updated");
            return mechanic_map_1.MechanicMap.toResponse(update);
        });
    }
}
exports.Employee_put_Profile_useCase = Employee_put_Profile_useCase;
