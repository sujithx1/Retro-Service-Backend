import { UserMap } from "../../../DTO/map/user.map";
import { UserResponsDto } from "../../../DTO/dto";
// import { UserIntities } from "../../../entities/Userentities";
// import { WalletEntities } from "../../../entities/walletEntities";
import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";
// import { IwalletRepositories } from "../../../interfaces/repositories/wallet/Iwalletrepositories";
import { comparePassword } from "../../../utils/hashPassword";


export class UserLogin{
    constructor(private userRepositories:IUserRepositories,
    ) {}

    async execute(email:string,password:string):Promise<UserResponsDto>{
        const user=await this.userRepositories.findByemail(email);
        if(!user) throw new Error("Email not Valid");
            console.log(user.password);
        if(user.isActive==false)throw new Error("user is Blocked");
            
        const compare=await comparePassword(password,user.password);
        if(!compare) throw new Error("password not matched");
         console.log("login success");

     
        // return new UserIntities(user.id,user.username,user.email,user.phone,user.password,user.isActive,user.profilePic,
        //     user.isAdmin,user.authSource,user.role
        // )
        return UserMap.toResponse(user);
        
    } 
}