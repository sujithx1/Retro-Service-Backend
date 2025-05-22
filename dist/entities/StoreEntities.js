"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreEntities = void 0;
class StoreEntities {
    constructor(id, name, owner_name, owner_email, owner_phone, isActive = true, password, storeId, profile_pic = "https://example.com/default-profile-pic.png", location, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.owner_name = owner_name;
        this.owner_email = owner_email;
        this.owner_phone = owner_phone;
        this.isActive = isActive;
        this.password = password;
        this.storeId = storeId;
        this.profile_pic = profile_pic;
        this.location = location;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.StoreEntities = StoreEntities;
