import { IPaymentRepositories } from "../../../interfaces/repositories/payments/IpaymentRepositories";
import { ServicePaymentEntity } from "../../../entities/servicePaymentEntities";
import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";


export class UserServiceRazorpayPayment{
    constructor(private paymentRepositories:IPaymentRepositories,
        private employeeRepositories:IEmployeeRepositories,
        private serviceRepositories:IreqservicemechanicsRepositories
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
            amount,
            "INR",
            "receipt#1",
            {  name,
                phone,
                problem,
                vehicleNumber
            },
            "COMPLETED",
            "",
            jobName,
           


        )
        const Servicepayment=await this.paymentRepositories.create(newPayment)
        const employee=await this.employeeRepositories.findById(employeeId)
        if(!employee)throw new CustomError("employee not Found",401,AppError.UserNotFound);
        const service=await this.serviceRepositories.findbyId(serviceId)
        if (!service) throw new CustomError("Service Not Found",401,AppError.ResourceNotFound);
        service.status="COMPLETED"
        await this.serviceRepositories.findByIdAndUpdate(service,employeeId)
        
        await this.employeeRepositories.findIdAndUpdateRevenue(employee.id,Servicepayment.amount)

        return Servicepayment


          
    }
}