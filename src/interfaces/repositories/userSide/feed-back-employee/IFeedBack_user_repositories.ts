import {  Report_feedBack_User_Entities } from "../../../../entities/Report_FeedBack_user";

export interface IReport_FeedBack_user_Repositories{
    findbyId(id:string):Promise<Report_feedBack_User_Entities|null>
    create(feedBack:Report_feedBack_User_Entities):Promise<Report_feedBack_User_Entities>
    findAll():Promise<Report_feedBack_User_Entities[]>

}