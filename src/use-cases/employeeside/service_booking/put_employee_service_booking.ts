import { ServiceEntities } from "../../../entities/ServiceEntities";
import { Iservice_bookingRepositories } from "../../../interfaces/repositories/servicebooking/serviceBooking";



export class Employee_put_Service_booking_useCase{
    constructor(private serviceBookingrep:Iservice_bookingRepositories){}

    async execute(id:string,status:"CONFIRMED" | "CANCELLED"):Promise<ServiceEntities>{
        const service=await this.serviceBookingrep.findbyId(id)
        if(!service) throw new Error("Service Not Found")
        service.status=status
    const update =await this.serviceBookingrep.findbyIdAndUpdate(service)
    if(!update) throw new Error("not updated")
        return update
    
    }
}