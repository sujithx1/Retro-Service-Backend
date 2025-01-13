"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestserviceMechEntities = void 0;
class RequestserviceMechEntities {
    constructor(id, userId, userName, userEmail, userLocation, jobId, jobName, minWage, problem, mechanics, status = "PENDING", bookingDate, acceptEmployee = null) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userLocation = userLocation;
        this.jobId = jobId;
        this.jobName = jobName;
        this.minWage = minWage;
        this.problem = problem;
        this.mechanics = mechanics;
        this.status = status;
        this.bookingDate = bookingDate;
        this.acceptEmployee = acceptEmployee;
    }
}
exports.RequestserviceMechEntities = RequestserviceMechEntities;
