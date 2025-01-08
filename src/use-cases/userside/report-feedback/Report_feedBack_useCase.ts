import { Report_feedBack_User_Entities } from "../../../entities/Report_FeedBack_user";
import { IReport_FeedBack_user_Repositories } from "../../../interfaces/repositories/userSide/feed-back-employee/IFeedBack_user_repositories";

export class Report_feedBack_user_useCase{
    constructor(private reportRep:IReport_FeedBack_user_Repositories) {
        
    }

    async execute(userId:string,
        name:string,
        employeeId:string,
        feedback:string):Promise<Report_feedBack_User_Entities>{

        
        const feedBack=new Report_feedBack_User_Entities(
            "",
            userId,
            name,
            "",
            employeeId,
            "",
            feedback,
            "",

        )

        return await this.reportRep.create(feedBack)
        
    }
}