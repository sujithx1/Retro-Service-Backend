import { UserIntities } from "../../../entities/Userentities";
import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";



export class User_Edit_useCase{
    constructor(private userRepositories:IUserRepositories){}

    async execute(id: string, username: string, phone: string, profilePic: string):Promise<UserIntities>{
        const user=await this.userRepositories.findById(id)
        if(!user) throw new Error("User id Not Valid")
        user.username=username
    user.phone=phone
    if (profilePic) {
        user.profilePic=profilePic
    }
    
    const updateUser=await this.userRepositories.findByIdAndUpdate(user)

    console.log("lassssssssssssssttttttttttttttttttt");
    if(!updateUser) throw new Error("User Not Updated")
        
    
    return updateUser
        
    }
}