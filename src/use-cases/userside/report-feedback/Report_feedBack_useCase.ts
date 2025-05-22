import { Report_feedBack_User_Entities } from "../../../entities/Report_FeedBack_user";
import { IReport_FeedBack_user_Repositories } from "../../../interfaces/repositories/userSide/feed-back-employee/IFeedBack_user_repositories";

export class Report_feedBack_user_useCase{
    constructor(private reportRep:IReport_FeedBack_user_Repositories) {
        
    }

    async execute(userId:string,
        employeeId:string,
        feedback:string,
        rating:number,
        type:"report"|"feedback",
        amount:number,
        bookingId:string
    
    ):Promise<Report_feedBack_User_Entities>{

        
        const feedBack=new Report_feedBack_User_Entities(
            "",
            userId,
            "",
            "",
            employeeId,
            "",
            feedback,
            "",
            rating,
            type,
            false,
            amount?amount:null,
            bookingId


        );

        return await this.reportRep.create(feedBack);
        
    }
}