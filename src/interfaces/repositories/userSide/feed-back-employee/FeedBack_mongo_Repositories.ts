import { Report_feedBack_User_Entities } from "../../../../entities/Report_FeedBack_user";
import { IEmployee_types } from "../../../../frameworks/db/models/EmployeeModel";
import { Report_FeedBack_user_Model } from "../../../../frameworks/db/models/Report_feedBack_user";
import { IuserTypes } from "../../../../frameworks/db/models/UserModel";
import { IReport_FeedBack_user_Repositories } from "./IFeedBack_user_repositories";



export class Report_FeedBack_user_MongoRepositories implements IReport_FeedBack_user_Repositories{
    async findbyId(id: string): Promise<Report_feedBack_User_Entities | null> {
        const feedback=await Report_FeedBack_user_Model.findById(id)
          .populate<{ user: IuserTypes }>({ path: 'user' })
          .populate<{ employee: IEmployee_types }>({ path: 'employee'})
                
        if(!feedback)return null
        console.log("Feeeeeeed",feedback);
        
        return new Report_feedBack_User_Entities(
            feedback.id,
            feedback.user._id.toString(),        
            feedback.user.username,
            feedback.user.email,
            feedback.employee.id,
            feedback.employee.username,
            feedback.feedBack,
            feedback.employee.email,
            feedback.rating,
            feedback.type,
            feedback.refundProcessed,
            feedback.amount,
            feedback.bookingId,
            feedback.createdAt,
            feedback.updatedAt,
            

        )       
    }
    async create(feedBack: Report_feedBack_User_Entities): Promise<Report_feedBack_User_Entities> {
        
        const feedback= await Report_FeedBack_user_Model.create(feedBack) 
        await feedback.populate<{ user: IuserTypes }>({ path: 'user' })
        await feedback.populate<{ employee: IEmployee_types }>({ path: 'employee' })

        
        return new Report_feedBack_User_Entities(
            feedback.id,
            feedback.user._id.toString(),        
            feedback.user.username,
            feedback.user.email,
            feedback.employee.id,
            feedback.employee.username,
            feedback.feedBack,
            "", 
            feedBack.rating,
            feedback.type,
            feedback.refundProcessed,
            feedback.amount,
            feedback.bookingId,
            feedback.createdAt,
            feedback.updatedAt,
        )
    }
    async findAll(): Promise<Report_feedBack_User_Entities[]> {
        
        const feedbacks=await Report_FeedBack_user_Model.find()
        .populate<{ user: IuserTypes }>({ path: 'user' })
        .populate<{ employee: IEmployee_types }>({ path: 'employee'})
        console.log("Feeeeeeed",feedbacks);

       return feedbacks.map((report)=>
            new Report_feedBack_User_Entities(
                report.id,
                report.user._id.toString(),        
                report.user.username,
                report.user.email,
                report.employee.id,
                report.employee.username,
                report.feedBack,
                report.employee.email,
                report.rating,
                report.type,
                report.refundProcessed,
                report.amount,
                report.bookingId,

                report.createdAt,
                report.updatedAt,
                
            )
        )


    }

    async findByIdAndupdate(feedback: Report_feedBack_User_Entities): Promise<Report_feedBack_User_Entities|null> {
        const report=await Report_FeedBack_user_Model.findByIdAndUpdate(feedback.id,{
            refundProcessed:true
        },{new:true,upsert:true})
        if(!report)return null

        return new Report_feedBack_User_Entities(
            report.id,
            report.user._id.toString(),        
            report.user.username,
            report.user.email,
            report.employee.id,
            report.employee.username,
            report.feedBack,
            report.employee.email,
            report.rating,
            report.type,
            report.refundProcessed,
            report.amount,
            report.bookingId,


            report.createdAt,
            report.updatedAt,
        )
    }




}