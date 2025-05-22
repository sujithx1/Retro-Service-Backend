import { RequestserviceMechEntities } from "../../../entities/reqserviceEntities";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";



export class User_putReqserviceUsecase{
    constructor(private reqserviceRepositories:IreqservicemechanicsRepositories) {
        
    }
    async execute(id:string,status:"CONFIRMED"|"CANCELLED"|"COMPLETED"|"PENDING"|"ACCEPTED"):Promise<RequestserviceMechEntities>{

        const reqService=await this.reqserviceRepositories.findbyId(id);
        if(!reqService) throw new CustomError("Invalid id",401,AppError.ResourceNotFound);
        reqService.status=status;
        const update=await this.reqserviceRepositories.findByIdAndUpdateCancellBooking(reqService);
        if(!update) throw new CustomError("Not updated",401,AppError.InvalidCredentials);
        
            return update;
    }
}