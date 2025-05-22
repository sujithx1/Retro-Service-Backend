import { UserIntities } from "../../entities/Userentities";
import {  UserResponsDto } from "../dto";

export class UserMap {
  static toResponse(user: UserIntities): UserResponsDto {
    console.log(user);
    
    return {
      id: user.id,
    //   _id:user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      isActive:user.isActive,
      isAdmin:user.isAdmin,
      profilePic:user.profilePic,
      role:user.role,
      authSource:user.authSource,
        location:user.location,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt
    
    };
  }
}