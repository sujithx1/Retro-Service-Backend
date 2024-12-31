import { UserIntities } from "../../../entities/Userentities";



export interface IUserRepositories{
    findByemail(email:string):Promise<UserIntities|null>
    save(user:UserIntities):Promise<void>
}