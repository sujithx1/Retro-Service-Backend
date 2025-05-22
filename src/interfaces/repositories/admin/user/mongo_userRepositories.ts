import { UserIntities } from "../../../../entities/Userentities";
import { UserModel } from "../../../../frameworks/db/models/UserModel";
import { IUser_Admin_repositories } from "./admin_userRepositories";


export class Mongo_admin_user_Repositories implements IUser_Admin_repositories{
    async findByall(): Promise<UserIntities[]> {
          const users = await UserModel.find();
                    return users.length?users
                    .filter((item) => !item.isAdmin) 
                    .map(
                      (item) =>
                        new UserIntities(
                          item.id,
                          item.username,
                          item.email,
                          item.phone,
                          item.password,
                          item.isActive,
                          item.profilePic,
                          item.isAdmin,
                          item.authSource,
                          item.role,
                          item.location,
                          item.createdAt,
                          item.updatedAt
                        )
                    ):[];
        
    }
    async findById(id: string): Promise<UserIntities | null> {
         const user=await UserModel.findById(id);
                if(!user)return null;
                return new UserIntities(
                    user.id,
                    user.username,
                    user.email,
                    user.phone,
                    user.password,
                
                    user.isActive,
                    user.profilePic,
                    user.isAdmin,
                    user.authSource,
                    user.role,
                    user.location,

                    user.createdAt,
                    user.updatedAt
                );
        
    }
    async findByIdAndUpdate(user: UserIntities): Promise<UserIntities | null> {


        const userData=await UserModel.findByIdAndUpdate(user.id,{
                    username:user.username,
                    phone: user.phone,
                
                    profilePic:user.profilePic,
                    isActive:user.isActive
                },{new:true}
            );
        
            if(!userData) return null;
            return new UserIntities(
                userData.id,
                userData.username,
                userData.email,
                userData.phone,
                userData.password,
               
                userData.isActive,
                userData.profilePic,
                userData.isAdmin,
                userData.authSource,
                userData.role,
                userData.location,
                userData.createdAt,
                userData.updatedAt
                
            );
        
    }
}