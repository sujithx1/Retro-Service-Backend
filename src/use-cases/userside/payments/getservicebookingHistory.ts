import { RequsetServiceResponseDto } from "../../../DTO/dto";
import {  ReqServiceMap } from "../../../DTO/map/reqservice.map";
// import { RequestserviceMechEntities } from "../../../entities/reqserviceEntities";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";

export class User_getServiceBookingHistoryByUserId{
    constructor(
        private reqServiceRepositories:IreqservicemechanicsRepositories
    ) {}


    async execute(userId:string):Promise<RequsetServiceResponseDto[]>
    {
        const services=await this.reqServiceRepositories.findbyUserId(userId);
        if(services.length==0) return [];
        return services.map((item)=>ReqServiceMap.toRespons(item));
        
    }
}