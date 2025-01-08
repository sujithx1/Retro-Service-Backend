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
exports.Report_feedBack_user_useCase = void 0;
const Report_FeedBack_user_1 = require("../../../entities/Report_FeedBack_user");
class Report_feedBack_user_useCase {
    constructor(reportRep) {
        this.reportRep = reportRep;
    }
    execute(userId, name, employeeId, feedback) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedBack = new Report_FeedBack_user_1.Report_feedBack_User_Entities("", userId, name, "", employeeId, "", feedback, "");
            return yield this.reportRep.create(feedBack);
        });
    }
}
exports.Report_feedBack_user_useCase = Report_feedBack_user_useCase;
