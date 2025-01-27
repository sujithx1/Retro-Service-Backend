import { UserIntities } from "../../../entities/Userentities";
import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export  class User_getdetails{
    constructor(private userrepositories:IUserRepositories) {
        
    }
    async  execute(useId:string):Promise<UserIntities>{
        const user=await  this.userrepositories.findById(useId)
        if(!user)throw new CustomError("user not found",401,AppError.UserNotFound);

        return user

    }
}