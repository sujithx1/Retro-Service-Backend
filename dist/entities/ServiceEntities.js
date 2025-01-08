"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceEntities = void 0;
class ServiceEntities {
    constructor(id, userId, employeeId, jobId, userLocation, status = "PENDING", bookingDate, service_Minwage, problem, userName, employeeName, JobName, userProfilePic, employeeLocation, userPhone, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.employeeId = employeeId;
        this.jobId = jobId;
        this.userLocation = userLocation;
        this.status = status;
        this.bookingDate = bookingDate;
        this.service_Minwage = service_Minwage;
        this.problem = problem;
        this.userName = userName;
        this.employeeName = employeeName;
        this.JobName = JobName;
        this.userProfilePic = userProfilePic;
        this.employeeLocation = employeeLocation;
        this.userPhone = userPhone;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.ServiceEntities = ServiceEntities;
