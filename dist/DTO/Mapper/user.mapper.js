"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const Userentities_1 = require("../../entities/Userentities");
const user_dto_1 = require("../user.dto");
class UserMapper {
    static toDTO(user) {
        return new user_dto_1.UserDTO(user.id, user.username, user.email, user.phone, user.isActive, user.profilePic, user.isAdmin, user.authSource, user.role, user.location, user.createdAt, user.updatedAt);
    }
    static toEntity(dto) {
        return new Userentities_1.UserIntities(dto.id, dto.username, dto.email, dto.phone, "", dto.isActive, dto.profilePic, dto.isAdmin, dto.authSource, dto.role, dto.location, dto.createdAt, dto.updatedAt);
    }
}
exports.UserMapper = UserMapper;
