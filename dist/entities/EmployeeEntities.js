"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeEntities = void 0;
class EmployeeEntities {
    constructor(id, username, email, phone, password, skills, experience, isActive = true, profilePic = "https://example.com/default-profile-pic.png", location = "", authSource, role = "employee", createdAt, updatedAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.skills = skills;
        this.experience = experience;
        this.isActive = isActive;
        this.profilePic = profilePic;
        this.location = location;
        this.authSource = authSource;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.EmployeeEntities = EmployeeEntities;
