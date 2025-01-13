import { ServiceDetails } from "../types/user"; // Assuming a separate file for service details type


export class ServicePaymentEntity {
  constructor(
    public id: string,
    public userId: string,
    public employeeId: string,
    public serviceId:string,
    public amount: number,
    public currency: string = "INR",
    public receipt: string,
    public serviceDetails: ServiceDetails,
    public status:  "PENDING" | "COMPLETED" | "FAILED"="PENDING",
    public paymentId?:string,
    public jobName?:string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}