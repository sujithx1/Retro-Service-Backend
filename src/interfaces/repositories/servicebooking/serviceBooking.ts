import { ServiceEntities } from "../../../entities/ServiceEntities";

export interface Iservice_bookingRepositories{
    
    findbyId(id:string):Promise<ServiceEntities |null>
    create(service:ServiceEntities):Promise<ServiceEntities>
    findByEmployee(empid:string):Promise<ServiceEntities[]|null>
    findbyIdAndUpdate(service:ServiceEntities):Promise<ServiceEntities|null>



}