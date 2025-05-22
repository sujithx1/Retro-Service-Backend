import { EmployeeEntities } from "../../entities/EmployeeEntities";
import { MechanicResponesDto } from "../dto";

export class MechanicMap {
  static toResponse(mechanic: EmployeeEntities): MechanicResponesDto {
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
