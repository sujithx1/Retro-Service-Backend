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
exports.Approve_MechanicadminuseCase = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class Approve_MechanicadminuseCase {
    constructor(mechanicrepositories) {
        this.mechanicrepositories = mechanicrepositories;
    }
    execute(mechId) {
        return __awaiter(this, void 0, void 0, function* () {
            const mechanic = yield this.mechanicrepositories.findById(mechId);
            if (!mechanic)
                throw new custom_errors_1.CustomError('Mechanic not found', 404, error_enum_1.AppError.UserNotFound);
            const update = yield this.mechanicrepositories.setValidate(mechId);
            if (!update)
                throw new custom_errors_1.CustomError('Not updated', 500, error_enum_1.AppError.ServerError);
        });
    }
}
exports.Approve_MechanicadminuseCase = Approve_MechanicadminuseCase;
