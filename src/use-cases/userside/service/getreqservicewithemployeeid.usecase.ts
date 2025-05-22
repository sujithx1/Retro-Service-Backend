import { RequestserviceMechEntities } from "../../../entities/reqserviceEntities";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export class EmpgetReqservice_useCase{
    constructor(private reqServiceRep:IreqservicemechanicsRepositories) {}
    async execute(empId:string):Promise<RequestserviceMechEntities[]|[]>{
console.log(empId,"usecase");

        const reqservice=await this.reqServiceRep.findbyempId(empId);
        if(reqservice.length==0) throw new CustomError("No services found for this employee",401,AppError.ResourceNotFound);
        return reqservice;
 

    } 
}