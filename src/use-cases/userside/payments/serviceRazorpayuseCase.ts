import { IPaymentRepositories } from "../../../interfaces/repositories/payments/IpaymentRepositories";
import { ServicePaymentEntity } from "../../../entities/servicePaymentEntities";
import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";
import { IwalletRepositories } from "../../../interfaces/repositories/wallet/Iwalletrepositories";
import { TransactionEntities } from "../../../entities/transactionEntities";
import { ItransactionRepositories } from "../../../interfaces/repositories/transaction/ItransactionRepositories";


export class UserServiceRazorpayPayment{
    constructor(private paymentRepositories:IPaymentRepositories,
        private employeeRepositories:IEmployeeRepositories,
        private serviceRepositories:IreqservicemechanicsRepositories,
        private walletrepositories:IwalletRepositories,
        private transactionrepositories:ItransactionRepositories
    ) {}

    async execute( name:string,     
     vehicleNumber:string,
     problem:string,
     phone:string,
     amount:number,
     employeeId:string,
     userId:string,
    jobName:string,
serviceId:string){
    

        const newPayment=new ServicePaymentEntity(
            "",
            userId,
            employeeId,
            serviceId,
            0,
            
            {  name,
                phone,
                problem,
                vehicleNumber
            },
            
            "CONFIRMED",
            "", 
            jobName,
           


        )

        const adminwallet=await this.walletrepositories.findByAdmin()
        if(!adminwallet) throw new CustomError("adminwallet not Found",401,AppError.ResourceNotFound);
        adminwallet.balance+=100
        const updateadminwallet=await this.walletrepositories.findByIdandUpdate(adminwallet)
        if(!updateadminwallet) throw new CustomError("wallet not update",401,AppError.ServerError);

        const Servicepayment=await this.paymentRepositories.create(newPayment)
        const employee=await this.employeeRepositories.findById(employeeId)
        if(!employee)throw new CustomError("employee not Found",401,AppError.UserNotFound);
        const service=await this.serviceRepositories.findbyId(serviceId)
        if (!service) throw new CustomError("Service Not Found",401,AppError.ResourceNotFound);
        service.status="CONFIRMED"
        service.paymentId=Servicepayment.id
        await this.serviceRepositories.findByIdAndUpdate(service,employeeId)
        
        await this.employeeRepositories.findIdAndUpdateRevenue(employee.id,Servicepayment.amount)
        const transaction=new TransactionEntities(
            "",
            Servicepayment.userId,
            "advancepay",
            100,
            "complete",
            "razorypay",
            "service"

        )
        await this.transactionrepositories.create(transaction)
    

        return Servicepayment


          
    }
}