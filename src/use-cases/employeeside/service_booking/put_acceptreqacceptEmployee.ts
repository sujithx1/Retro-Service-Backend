import { RequestserviceMechEntities } from "../../../entities/reqserviceEntities";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class Accept_reqServiceEmployee{
    constructor(private reqseriveRepositories:IreqservicemechanicsRepositories) {}

    async execute(id:string,empId:string,status:"CONFIRMED" | "CANCELLED"):Promise<RequestserviceMechEntities>{

        const reqservice=await this.reqseriveRepositories.findbyId(id);
        if(!reqservice) throw new CustomError("Service not found",401,AppError.ResourceNotFound);

       
console.log("Mechanics List:", reqservice.mechanics.map(mech => mech                            ));
console.log("Searching for Employee ID:", empId);

const mechanic = reqservice.mechanics.find(mech => mech.employeeId == empId);

    
  
    
    if (!mechanic) {
        console.error(`❌ Mechanic with ID ${empId} not found in service mechanics list.`);
        throw new CustomError("Mechanic not found in service", 404, AppError.ResourceNotFound);
    }
    
    console.log("✅ Mechanic found:", mechanic);
    
        reqservice.status=status;
        const update =await this.reqseriveRepositories.findByIdAndUpdate(reqservice,empId);
        if(!update) throw new CustomError("Not updated",401,AppError.ServerError);

        return update;    
        
        
        


    }
}