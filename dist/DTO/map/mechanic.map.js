"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MechanicMap = void 0;
class MechanicMap {
    static toResponse(mechanic) {
        return {
            id: mechanic.id,
            username: mechanic.username,
            email: mechanic.email,
            phone: mechanic.phone,
            isActive: mechanic.isActive,
            experience: mechanic.experience,
            isValidated: mechanic.isValidated,
            onDuty: mechanic.onDuty,
            proof: mechanic.proof,
            skills: mechanic.skills,
            FCM_token: mechanic.FCM_token,
            revenue: mechanic.revenue,
            profilePic: mechanic.profilePic,
            role: mechanic.role,
            authSource: mechanic.authSource,
            location: mechanic.location,
            createdAt: mechanic.createdAt,
            updatedAt: mechanic.updatedAt,
        };
    }
}
exports.MechanicMap = MechanicMap;
