import { UserIntities } from "../../../entities/Userentities";
import { WalletEntities } from "../../../entities/walletEntities";
import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";
import { IwalletRepositories } from "../../../interfaces/repositories/wallet/Iwalletrepositories";
import { hashpass } from "../../../utils/hashPassword";


export class CreateUser{
    constructor(private userRepositores:IUserRepositories,
        private walletrepositories:IwalletRepositories

    ) {}

    async exicute(data:{username:string,email:string,phone:string,password:string}):Promise<UserIntities>
    {
        const {username,email,phone,password}=data
       
        const hashPassword=await hashpass(password)
        const user=new UserIntities(
            "",
            username,
            email,
            phone,
            hashPassword
        )

        
       const newUser=await this.userRepositores.save(user)

       const wallet=new WalletEntities(
        "",
        newUser.id,
        "user",
        0,
    
        
    )
        
    this.walletrepositories.create(wallet)
        
        return newUser


    }
}