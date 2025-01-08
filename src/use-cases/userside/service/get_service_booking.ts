import { ServiceEntities } from "../../../entities/ServiceEntities";
import { Iservice_bookingRepositories } from "../../../interfaces/repositories/servicebooking/serviceBooking";


export class User_get_Service_Booking_useCase{
    constructor(private Service_bookingRep:Iservice_bookingRepositories){}

    async execute(id:string):Promise<ServiceEntities>{
        const service=await this.Service_bookingRep.findbyId(id)
        if(!service) throw new Error("Service not Found")
            return service
        }
}