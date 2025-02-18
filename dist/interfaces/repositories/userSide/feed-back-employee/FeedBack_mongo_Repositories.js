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
exports.Report_FeedBack_user_MongoRepositories = void 0;
const Report_FeedBack_user_1 = require("../../../../entities/Report_FeedBack_user");
const Report_feedBack_user_1 = require("../../../../frameworks/db/models/Report_feedBack_user");
class Report_FeedBack_user_MongoRepositories {
    findbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedback = yield Report_feedBack_user_1.Report_FeedBack_user_Model.findById(id)
                .populate({ path: 'user' })
                .populate({ path: 'employee' });
            if (!feedback)
                return null;
            console.log("Feeeeeeed", feedback);
            return new Report_FeedBack_user_1.Report_feedBack_User_Entities(feedback.id, feedback.user._id.toString(), feedback.user.username, feedback.user.email, feedback.employee.id, feedback.employee.username, feedback.feedBack, feedback.employee.email, feedback.rating, feedback.type, feedback.refundProcessed, feedback.amount, feedback.bookingId, feedback.createdAt, feedback.updatedAt);
        });
    }
    create(feedBack) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedback = yield Report_feedBack_user_1.Report_FeedBack_user_Model.create(feedBack);
            yield feedback.populate({ path: 'user' });
            yield feedback.populate({ path: 'employee' });
            return new Report_FeedBack_user_1.Report_feedBack_User_Entities(feedback.id, feedback.user._id.toString(), feedback.user.username, feedback.user.email, feedback.employee.id, feedback.employee.username, feedback.feedBack, "", feedBack.rating, feedback.type, feedback.refundProcessed, feedback.amount, feedback.bookingId, feedback.createdAt, feedback.updatedAt);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const feedbacks = yield Report_feedBack_user_1.Report_FeedBack_user_Model.find()
                .populate({ path: 'user' })
                .populate({ path: 'employee' });
            console.log("Feeeeeeed", feedbacks);
            return feedbacks.map((report) => new Report_FeedBack_user_1.Report_feedBack_User_Entities(report.id, report.user._id.toString(), report.user.username, report.user.email, report.employee.id, report.employee.username, report.feedBack, report.employee.email, report.rating, report.type, report.refundProcessed, report.amount, report.bookingId, report.createdAt, report.updatedAt));
        });
    }
    findByIdAndupdate(feedback) {
        return __awaiter(this, void 0, void 0, function* () {
            const report = yield Report_feedBack_user_1.Report_FeedBack_user_Model.findByIdAndUpdate(feedback.id, {
                refundProcessed: true
            }, { new: true, upsert: true });
            if (!report)
                return null;
            return new Report_FeedBack_user_1.Report_feedBack_User_Entities(report.id, report.user._id.toString(), report.user.username, report.user.email, report.employee.id, report.employee.username, report.feedBack, report.employee.email, report.rating, report.type, report.refundProcessed, report.amount, report.bookingId, report.createdAt, report.updatedAt);
        });
    }
}
exports.Report_FeedBack_user_MongoRepositories = Report_FeedBack_user_MongoRepositories;
