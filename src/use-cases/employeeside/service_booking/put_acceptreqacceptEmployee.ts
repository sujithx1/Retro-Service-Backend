import { RequestserviceMechEntities } from "../../../entities/reqserviceEntities";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class Accept_reqServiceEmployee{
    constructor(private reqseriveRepositories:IreqservicemechanicsRepositories) {}

    async execute(id:string,empId:string,status:"CONFIRMED" | "CANCELLED"):Promise<RequestserviceMechEntities>{

        const reqservice=await this.reqseriveRepositories.findbyId(id)
        if(!reqservice) throw new CustomError("Service not found",401,AppError.ResourceNotFound)

        reqservice.status=status
        const update =await this.reqseriveRepositories.findByIdAndUpdate(reqservice,empId)
        if(!update) throw new CustomError("Not updated",401,AppError.ServerError);

        return update    
        
        
        


    }
}