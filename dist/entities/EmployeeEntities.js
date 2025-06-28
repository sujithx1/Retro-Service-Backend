"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeEntities = void 0;
class EmployeeEntities {
    constructor(id, username, email, phone, password, skills, experience, isValidated, proof = "", isActive = true, profilePic = "https://example.com/default-profile-pic.png", location, authSource, role = "employee", revenue, onDuty = false, FCM_token, createdAt, updatedAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.skills = skills;
        this.experience = experience;
        this.isValidated = isValidated;
        this.proof = proof;
        this.isActive = isActive;
        this.profilePic = profilePic;
        this.location = location;
        this.authSource = authSource;
        this.role = role;
        this.revenue = revenue;
        this.onDuty = onDuty;
        this.FCM_token = FCM_token;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.EmployeeEntities = EmployeeEntities;
