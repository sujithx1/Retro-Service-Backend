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
exports.Admin_get_allEmployees_useCase = void 0;
const mechanic_map_1 = require("../../../DTO/map/mechanic.map");
class Admin_get_allEmployees_useCase {
    constructor(emplrepositories) {
        this.emplrepositories = emplrepositories;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.emplrepositories.findAll();
            return employees.map((item) => mechanic_map_1.MechanicMap.toResponse(item));
        });
    }
}
exports.Admin_get_allEmployees_useCase = Admin_get_allEmployees_useCase;
