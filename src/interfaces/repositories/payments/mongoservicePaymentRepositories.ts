import { ServicePaymentEntity } from "../../../entities/servicePaymentEntities";
import { ServicePaymentModel } from "../../../frameworks/db/models/servicePayment_model";
import { IPaymentRepositories } from "./IpaymentRepositories";

export class ServicePaymentMongoRepositories implements IPaymentRepositories {
    async create(service: ServicePaymentEntity): Promise<ServicePaymentEntity> {
        const servicepayment = await ServicePaymentModel.create(service);
        return new ServicePaymentEntity(
            servicepayment.id,
            servicepayment.userId?.toString() || '',
            servicepayment.employeeId?.toString() || '',
            servicepayment.serviceId?.toString() || '',
            servicepayment.amount,
            servicepayment.serviceDetails,
            servicepayment.status,
            servicepayment.paymentId,
            servicepayment.jobName,
            servicepayment.createdAt,
            servicepayment.updatedAt
        );
    }

    async findByUserId(id: string): Promise<ServicePaymentEntity[] | []> {
        console.log(id);
        
        const bookings = await ServicePaymentModel.find({ userId: id });
        if (!bookings.length) return [];

        return bookings.map(service => new ServicePaymentEntity(
            service.id,
            service.userId?.toString() || '',
            service.employeeId?.toString() || '',
            service.serviceId?.toString() || '',
            service.amount,
            service.serviceDetails,
            service.status,
            service.paymentId,
            service.jobName,
            service.createdAt,
            service.updatedAt
        ));
    }

    async findById(id: string): Promise<ServicePaymentEntity | null> {
        const service=await ServicePaymentModel.findById(id)
        if(!service) return null
        return new ServicePaymentEntity(
            service.id,
            service.userId?.toString() || '',
            service.employeeId?.toString() || '',
            service.serviceId?.toString() || '',
            service.amount,
            service.serviceDetails,
            service.status,
            service.paymentId,
            service.jobName,
            service.createdAt,
            service.updatedAt
        )
        
    }



  async  findByIdAndUpdate(payment: ServicePaymentEntity): Promise<ServicePaymentEntity | null> {
    
    
    const service=await ServicePaymentModel.findByIdAndUpdate(payment.id,{
    
        status:payment.status,
        paymentId:payment.paymentId,
        amount:payment.amount,
        'serviceDetails.phone':payment.serviceDetails.phone,
        'serviceDetails.vehicleNumber':payment.serviceDetails.vehicleNumber

        
        
            
    },{new:true,upsert:true})
    if(!service)return null
    return new ServicePaymentEntity(
        service.id,
        service.userId?.toString() || '',
        service.employeeId?.toString() || '',
        service.serviceId?.toString() || '',
        service.amount,
        service.serviceDetails,
        service.status,
        service.paymentId,
        service.jobName,
        service.createdAt,
        service.updatedAt
    )
    

        
    }
}
