"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIntities = void 0;
class UserIntities {
    constructor(id, username, email, phone, password, isActive = true, profilePic = "https://example.com/default-profile-pic.png", isAdmin = false, authSource, role = "user", location, createdAt, updatedAt) {
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
        this.location = location;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}
exports.UserIntities = UserIntities;
