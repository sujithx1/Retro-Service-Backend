"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminEntities = void 0;
class AdminEntities {
    constructor(id, username, email, phone, password, isActive = false, profilePic = "https://example.com/default-profile-pic.png", isAdmin = false, authSource, role = 'admin', createdAt, updatedAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.isActive = isActive;
        this.profilePic = profilePic;
        this.isAdmin = isAdmin;
        this.authSource = authSource;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.AdminEntities = AdminEntities;
