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
exports.Employee_put_job_useCase = void 0;
class Employee_put_job_useCase {
    constructor(empRep) {
        this.empRep = empRep;
    }
    execute(id, jobName, isChecked) {
        return __awaiter(this, void 0, void 0, function* () {
            const employe = yield this.empRep.findById(id);
            if (!employe) {
                throw new Error("Employee id not matching ");
            }
            if (isChecked) {
                employe.skills.push(jobName);
            }
            else {
                employe.skills = employe.skills.filter((skill) => skill !== jobName);
            }
            const update = yield this.empRep.findByIdAndUpdate(employe);
            if (!update)
                throw new Error("Not updated");
            return update;
        });
    }
}
exports.Employee_put_job_useCase = Employee_put_job_useCase;
