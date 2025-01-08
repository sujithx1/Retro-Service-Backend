import { UserIntities } from "../../../entities/Userentities";
import { IUser_Admin_repositories } from "../../../interfaces/repositories/admin/user/admin_userRepositories";

export class Admin_get_allUsers_useCase{
    constructor(private userRepositoris:IUser_Admin_repositories){}

    async execute():Promise<UserIntities[]>{
        return this.userRepositoris.findByall()
        
    }
}