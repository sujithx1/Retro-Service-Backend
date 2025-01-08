import { ServiceEntities } from "../../../entities/ServiceEntities";
import { Iservice_bookingRepositories } from "../../../interfaces/repositories/servicebooking/serviceBooking";

export class Employee_Service_Booking_useCase{
    constructor(private serviceBookingRep:Iservice_bookingRepositories ){}
    async execute(id:string):Promise<ServiceEntities[]>{
        const EmployeeBooking=await this.serviceBookingRep.findByEmployee(id)
        if(!EmployeeBooking) throw new Error("You have No Booking ")
        return EmployeeBooking
    }
}