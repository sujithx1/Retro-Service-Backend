import { RequestserviceMechEntities } from "../../../entities/reqserviceEntities";

export interface IreqservicemechanicsRepositories{
    create(services:RequestserviceMechEntities):Promise<RequestserviceMechEntities>
    findbyempId(empid:string):Promise<RequestserviceMechEntities[]|[]>
    findbyUserId(userId:string):Promise<RequestserviceMechEntities[]|[]>
    findbyId(id:string):Promise<RequestserviceMechEntities|null>
    findByIdAndUpdate(reqService:RequestserviceMechEntities,empId:string):Promise<RequestserviceMechEntities|null>
    findByIdAndUpdateCancellBooking(reqService:RequestserviceMechEntities):Promise<RequestserviceMechEntities|null>

    
}