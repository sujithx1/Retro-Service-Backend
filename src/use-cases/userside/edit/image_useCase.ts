import { UserIntities } from "../../../entities/Userentities";
import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";


export class User_Put_Image_UseCase{
    constructor(private userrrpositorise:IUserRepositories){}

    
    async execute(id:string,profile_pic:string):Promise<UserIntities>{

        const user=await this.userrrpositorise.findById(id)
        if(!user) throw new Error("User not found by Id")
            if (profile_pic) {
                user.profilePic=profile_pic
                
            }
        const update=await this.userrrpositorise.findByIdAndUpdate(user)
        if(!update)throw new Error("not updated")
            return update

    }
}