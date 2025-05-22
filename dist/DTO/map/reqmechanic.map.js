"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqServiceMap = void 0;
class ReqServiceMap {
    static toRespons(reqMech) {
        return {
            id: reqMech.id,
            jobName: reqMech.jobName,
            jobId: reqMech.jobId,
            userId: reqMech.userId,
            userEmail: reqMech.userEmail,
            userName: reqMech.userName,
            userLocation: reqMech.userLocation,
            mechanics: reqMech.mechanics,
            minWage: reqMech.minWage,
            problem: reqMech.problem,
            acceptEmployee: reqMech.acceptEmployee,
            bookingDate: reqMech.bookingDate,
            status: reqMech.status,
            // paymentId:reqMech.payme
        };
    }
}
exports.ReqServiceMap = ReqServiceMap;
