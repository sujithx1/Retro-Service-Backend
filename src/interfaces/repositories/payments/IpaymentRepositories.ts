import { ServicePaymentEntity } from "../../../entities/servicePaymentEntities";


export interface IPaymentRepositories{
    create(service:ServicePaymentEntity):Promise<ServicePaymentEntity>
    findByUserId(id:string):Promise<ServicePaymentEntity[] | []>
    
}