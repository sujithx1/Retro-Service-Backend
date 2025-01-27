import { RequestserviceMechEntities } from "../../../entities/reqserviceEntities";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";

export class User_getServiceBookingHistoryByUserId{
    constructor(
        private reqServiceRepositories:IreqservicemechanicsRepositories
    ) {}


    async execute(userId:string):Promise<RequestserviceMechEntities[]>
    {
        const services=await this.reqServiceRepositories.findbyUserId(userId)
        if(services.length==0) return []
        return services
        
    }
}