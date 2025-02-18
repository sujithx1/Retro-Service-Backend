import { ReqService_MechanicTypes, RequestserviceMechEntities } from "../../../entities/reqserviceEntities";
import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export class User_putserviceSpecificEmp {
  constructor(
    private servicerepositories: IreqservicemechanicsRepositories,
    private employeerepositoires: IEmployeeRepositories
  ) {}
  async execute(
    serivceid: string,
    employeeid: string
  ): Promise<RequestserviceMechEntities> {
    console.log("User_putserviceSpecificEmp use case");
    
    const service = await this.servicerepositories.findbyId(serivceid);
    if (!service)
      throw new CustomError("servicenotfound", 401, AppError.ResourceNotFound);
    const employee = await this.employeerepositoires.findById(employeeid);
    if (!employee)
      throw new CustomError("employee not found", 401, AppError.UserNotFound);
    if(service.status==="REJECT"){

     service.mechanics = [];
     service.status = "PENDING";
    }
    const mechanic:ReqService_MechanicTypes={
        employeeId:employeeid,
        bookingDate:new Date(),
        // status:"PENDING"
    
    }
     // Ensure mechanics array exists before pushing
     if (!Array.isArray(service.mechanics)) {
        service.mechanics = [];
      }
  
    // Avoid duplicate mechanic entries
    const existingMechanic = service.mechanics.find((m) => m.employeeId.toString() == employeeid);
    console.log(existingMechanic);
    
    if (!existingMechanic) {
      service.mechanics.push(mechanic);
    } else {
      throw new CustomError("Employee already assigned", 401, AppError.DuplicateError);
    }

    // Update the service in the database
    const updatedService = await this.servicerepositories.findByIdAndUpdateService(service);
    if (!updatedService) {
      throw new CustomError("Service update failed", 500, AppError.ServerError);
    }

    console.log("Service updated successfully");
    return updatedService;
  }     
}
