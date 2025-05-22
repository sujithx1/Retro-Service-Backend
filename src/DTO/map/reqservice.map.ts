import { RequestserviceMechEntities } from "../../entities/reqserviceEntities";
import {  RequsetServiceResponseDto } from "../dto";


export class ReqServiceMap{
    static toRespons(reqMech:RequestserviceMechEntities):RequsetServiceResponseDto{
        return {
            id:reqMech.id,
            jobName:reqMech.jobName,
            jobId:reqMech.jobId,
            userId:reqMech.userId,
            userEmail:reqMech.userEmail,
            userName:reqMech.userName,
            userLocation:reqMech.userLocation,
            mechanics:reqMech.mechanics,
            minWage:reqMech.minWage,
            problem:reqMech.problem,
            acceptEmployee:reqMech.acceptEmployee,
            bookingDate:reqMech.bookingDate,
            status:reqMech.status,
            paymentId:reqMech.paymentId
        };
    }
}