import { Report_feedBack_User_Entities } from "../../../entities/Report_FeedBack_user";
import { IReport_FeedBack_user_Repositories } from "../../../interfaces/repositories/userSide/feed-back-employee/IFeedBack_user_repositories";


export class Admin_get_feedbacks_useCase{
    constructor(private reportFeedbackrep:IReport_FeedBack_user_Repositories) {
        
    }

    async execute():Promise<Report_feedBack_User_Entities[]>{
        const feedbacks=await this.reportFeedbackrep.findAll();
        return feedbacks;
    }
}   