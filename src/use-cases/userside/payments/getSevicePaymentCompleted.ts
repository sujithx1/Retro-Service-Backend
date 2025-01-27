import { IPaymentRepositories } from "../../../interfaces/repositories/payments/IpaymentRepositories";

export class UserServiceBookingHistoryusecase{
    constructor(private paymentRepositories:IPaymentRepositories){}
    async execute(id:string){
        const service=await this.paymentRepositories.findByUserId(id)
        return service





    }
} 