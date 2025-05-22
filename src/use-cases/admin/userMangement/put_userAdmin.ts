import { UserResponsDto } from "../../../DTO/dto";
import { UserMap } from "../../../DTO/map/user.map";
import { UserIntities } from "../../../entities/Userentities";
import { IUser_Admin_repositories } from "../../../interfaces/repositories/admin/user/admin_userRepositories";


export class Admin_put_user_useCase{
    constructor(
        private userRepositories:IUser_Admin_repositories
    ){}


    
    
        async execute(id:string,username:string,phone:string):Promise<UserResponsDto>{
            const user=await this.userRepositories.findById(id);
            if(!user) throw new Error("id not matching ");
                user.username=username,
                 user.phone=phone;
            
            
            const update=await this.userRepositories.findByIdAndUpdate(user);
            if(!update) throw new Error("Not updateded");
            return UserMap.toResponse(update)
            }
}