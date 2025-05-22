import { ServicePaymentEntity } from "../../../entities/servicePaymentEntities";
import { IPaymentRepositories } from "../../../interfaces/repositories/payments/IpaymentRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class Emp_getPaymentDetails{
        constructor(private paymentRepositoires:IPaymentRepositories) {
            
        }


        async execute(paymentId:string):Promise<ServicePaymentEntity>{
            const servicepayment=await this.paymentRepositoires.findById(paymentId);
            if(!servicepayment) throw new CustomError("PaymentId not valid",401,AppError.ResourceNotFound);
            return servicepayment;
            
        }
}