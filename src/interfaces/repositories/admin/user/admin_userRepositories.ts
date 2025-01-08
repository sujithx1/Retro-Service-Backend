import { UserIntities } from "../../../../entities/Userentities";


export interface IUser_Admin_repositories{
    findByall():Promise<UserIntities[]>
    findById(id:string):Promise<UserIntities|null>
    findByIdAndUpdate(user:UserIntities):Promise<UserIntities|null>
    
}