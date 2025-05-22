
import { IPaymentRepositories } from "../../../interfaces/repositories/payments/IpaymentRepositories";
// import { ServicePaymentEntity } from "../../../entities/servicePaymentEntities";
import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";
import { ItransactionRepositories } from "../../../interfaces/repositories/transaction/ItransactionRepositories";
import { TransactionEntities } from "../../../entities/transactionEntities";

export class User_CompleteServiceBooking_payment{
   constructor(private paymentRepositories:IPaymentRepositories,
           private employeeRepositories:IEmployeeRepositories,
           private serviceRepositories:IreqservicemechanicsRepositories,
           private transactionrepositories:ItransactionRepositories
       ) {}
   
       async execute(  
        id:string,  
        vehicleNumber:string,
      
        phone:string,
        amount:number,
      ){
       
   
    
   
           const Servicepayment=await this.paymentRepositories.findById(id);
           if(!Servicepayment) throw new CustomError("servicePayment not found",401,AppError.ResourceNotFound);
            Servicepayment.serviceDetails.phone=phone;
            Servicepayment.serviceDetails.vehicleNumber=vehicleNumber;
            Servicepayment.amount=amount;
            Servicepayment.status="COMPLETED";
            
            const update=await this.paymentRepositories.findByIdAndUpdate(Servicepayment);
             if(!update)throw new CustomError("payment not updated",401,AppError.ServerError);
           const employee=await this.employeeRepositories.findById(Servicepayment.employeeId);
           if(!employee)throw new CustomError("employee not Found",401,AppError.UserNotFound);
           const service=await this.serviceRepositories.findbyId(Servicepayment.serviceId);
           if (!service) throw new CustomError("Service Not Found",401,AppError.ResourceNotFound);
           service.status="COMPLETED";
           service.paymentId=Servicepayment.id;
           await this.serviceRepositories.findByIdAndUpdate(service,employee.id);
           
           await this.employeeRepositories.findIdAndUpdateRevenue(employee.id,Servicepayment.amount);

           const usertransaction=new TransactionEntities(
            "",
            Servicepayment.userId,
            "payment",
            Number(amount),
            "complete",
            "razorpay",
          "service"

           );
           await this.transactionrepositories.create(usertransaction);
           const emptransaction=new TransactionEntities(
            "",
            Servicepayment.employeeId,
            "credited",
            Number(amount),
            "complete",
            "razorpay",
            "service"

           );
           await this.transactionrepositories.create(emptransaction);

   
           return Servicepayment;
   
   
             
       }
}