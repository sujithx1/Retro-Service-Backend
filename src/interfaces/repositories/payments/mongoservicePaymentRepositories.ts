import { ServicePaymentEntity } from "../../../entities/servicePaymentEntities";
import { ServicePaymentModel } from "../../../frameworks/db/models/servicePayment_model";
import { IPaymentRepositories } from "./IpaymentRepositories";


export class ServicePaymentMongoRepositories implements IPaymentRepositories{
    async create(service: ServicePaymentEntity): Promise<ServicePaymentEntity> {
        const servicepayment=await ServicePaymentModel.create(service)
        return  new ServicePaymentEntity(
            servicepayment.id,
              servicepayment.userId.toString(),
                servicepayment.employeeId.toString(),
                servicepayment.serviceId.toString(),
                servicepayment.amount,
                servicepayment.currency,
                servicepayment.receipt,
                servicepayment.serviceDetails,
                servicepayment.status,
                servicepayment.paymentId,
                servicepayment.jobName,
                servicepayment.createdAt,
                servicepayment.updatedAt
           
        )
    }
   async findByUserId(id: string): Promise<ServicePaymentEntity[] | []> {
    const booking=await ServicePaymentModel.find({userId:id})
    if(!booking.length)return []
    return booking.map((service)=>new ServicePaymentEntity(
        service.id,
        service.userId.toString(),
          service.employeeId.toString(),
          service.serviceId.toString(),
          service.amount,
          service.currency,
          service.receipt,
          service.serviceDetails,
          service.status,
          service.paymentId,
          service.jobName,
          service.createdAt,
          service.updatedAt

    ))
        
    }
}