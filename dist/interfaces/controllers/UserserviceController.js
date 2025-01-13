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
exports.ServiceController = void 0;
const custom_errors_1 = require("../../utils/errors/custom.errors");
const error_enum_1 = require("../../utils/errors/error.enum");
class ServiceController {
    constructor(createrewservicesmech, getemployeeReqservice) {
        this.createrewservicesmech = createrewservicesmech;
        this.getemployeeReqservice = getemployeeReqservice;
    }
    reqserviceEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, userName, userEmail, userLocation, jobId, jobName, Min_wage, problem, } = req.body;
                if (!userId ||
                    !userName ||
                    !userEmail ||
                    !userLocation ||
                    !jobId ||
                    !jobName ||
                    !Min_wage ||
                    !problem) {
                    return next(new custom_errors_1.CustomError("missing filed", 401, error_enum_1.AppError.ValidationError));
                }
                console.log(userId, userName, userEmail, userLocation, jobId, jobName, Min_wage, problem);
                const reqService = yield this.createrewservicesmech.execute(userId, userEmail, userName, userLocation, jobId, jobName, Min_wage, problem);
                console.log(reqService);
                return res.status(201).json({ message: "success", succes: true, reqService: reqService });
            }
            catch (error) {
                console.log("reqserviceEmployee error", error);
                return next(error);
            }
        });
    }
    employee_getReqServiceCntroll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(" get controller");
                const { empid } = req.params;
                if (!empid) {
                    return next(new custom_errors_1.CustomError("employee id missing", 401, error_enum_1.AppError.ValidationError));
                }
                const reqService = yield this.getemployeeReqservice.execute(empid);
                console.log(reqService);
                return res.status(200).json({ message: "success", reqService, succes: true });
            }
            catch (error) {
                console.log("error userlogout", error);
                return next(error);
            }
        });
    }
}
exports.ServiceController = ServiceController;
