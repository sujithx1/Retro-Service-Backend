import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";
import { Address_Types, Location } from "../../../types/user";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class UserLocation_useCase{
    constructor(private userrepositories:IUserRepositories){}
    
    async execute(id:string,lat:number,lng:number,address:Address_Types,):Promise<Location>{
        const user= await this.userrepositories.findById(id);
        if(!user) throw new CustomError("user not found ",401,AppError.UserNotFound);
         const update=await this.userrepositories.findByIdAndUpdatelocation(id,{lat,lng,address});
        if(!update?.location) throw new CustomError("not Updated",401,AppError.ServerError);
        return update.location;

            
    }
}