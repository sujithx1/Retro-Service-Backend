import { UserMap } from "../../../DTO/map/user.map";
import { UserResponsDto } from "../../../DTO/dto";
import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export  class User_getdetails{
    constructor(private userrepositories:IUserRepositories) {
        
    }
    async  execute(useId:string):Promise<UserResponsDto>{
        const user=await  this.userrepositories.findById(useId);
        if(!user)throw new CustomError("user not found",401,AppError.UserNotFound);

        return UserMap.toResponse(user);

    }
}