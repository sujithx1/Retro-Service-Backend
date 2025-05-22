import { ReqServiceMap } from "../../../DTO/map/reqservice.map";
import { RequestserviceMechEntities } from "../../../entities/reqserviceEntities";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class User_getReqServiceuseCase{
    constructor(private reqServiceRepositories:IreqservicemechanicsRepositories) {}

    async execute(id:string):Promise<RequestserviceMechEntities>{
            const reqService=await this.reqServiceRepositories.findbyId(id);
            if(!reqService)throw new CustomError("Service Not found",401,AppError.ResourceNotFound);

            return ReqServiceMap.toRespons(reqService);
            
    }
}