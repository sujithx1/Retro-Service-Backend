import { UserResponsDto } from "../../../DTO/dto";
import { UserMap } from "../../../DTO/map/user.map";
import { UserIntities } from "../../../entities/Userentities";
import { IUser_Admin_repositories } from "../../../interfaces/repositories/admin/user/admin_userRepositories";


export class admin_Block_UnBlock_User_useCase{
    constructor(private userRepositories:IUser_Admin_repositories) {
        
    }

    async execute(id:string):Promise<UserResponsDto>{
            const user=await this.userRepositories.findById(id);
            if(!user) throw new Error("id is not matching ");
            user.isActive=!user.isActive;
        
            const update= await this.userRepositories.findByIdAndUpdate(user);
    
            if(!update) throw new Error("not updated");
                console.log(update);
                
            return UserMap.toResponse(update)
        }

}