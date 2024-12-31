import { UserIntities } from "../../entities/Userentities";
import { IUserRepositories } from "../../interfaces/repositories/userSide/IUserrRepositories";
import { hashpass } from "../../utils/hashPassword";


export class CreateUser{
    constructor(private userRepositores:IUserRepositories) {}

    async exicute(data:{username:string,email:string,phone:string,password:string}):Promise<UserIntities>
    {
        const {username,email,phone,password}=data
        const existUser=await this.userRepositores.findByemail(email)
        if(existUser) throw new Error("User Already Exist")

        const hashPassword=await hashpass(password)
        const user=new UserIntities(
            "",
            username,
            email,
            phone,
            hashPassword
        )

        await this.userRepositores.save(user)   

        return user


    }
}