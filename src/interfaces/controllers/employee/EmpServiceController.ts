import { NextFunction, Request, Response } from "express";
import { EmpgetReqservice_useCase } from "../../../use-cases/userside/service/getreqservicewithemployeeid.usecase";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { Accept_reqServiceEmployee } from "../../../use-cases/employeeside/service_booking/put_acceptreqacceptEmployee";
import { Emp_getPaymentDetails } from "../../../use-cases/employeeside/payment/getPaymentDetails";



export class EmpServiceController{
    constructor(    
        private getemployeeReqservice:EmpgetReqservice_useCase,
        private putEmployeeReqservice:Accept_reqServiceEmployee,
        private getServicePayment:Emp_getPaymentDetails
    ) {}
    
  async employee_getReqServiceCntroll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(" get controller");

      const { id } = req.params;
      if (!id) {
        return next(new CustomError("employee id missing",401,AppError.ValidationError));
      }
      
      
      const reqService =await this.getemployeeReqservice.execute(id)

    return res.status(200).json({ message: "success", reqService,succes:true });
    } catch (error) {
      console.log("error userlogout", error);
      return next(error);
    }
  }
    
  async employee_putreqServceacceptcntroll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("[put] controller");

      const { id } = req.params;
      const {status,employeeId}=req.body
      console.log(req.body);
      
      if (!status||!employeeId) {
        return next(new CustomError("missing fields",401,AppError.ValidationError))
        
      }
      if (!id) {
        return next(new CustomError("id missing",401,AppError.ValidationError));
      }
      console.log("emp id",id);
     
      
      const reqService =await this.putEmployeeReqservice.execute(id,employeeId,status)

    return res.status(200).json({ message: "success", reqService,succes:true });
    } catch (error) {
      console.log("error userlogout", error);
      return next(error);
    }
  }
    
  async employee_getPaymentDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(" get controller");

      const { id } = req.params;
     
      if (!id) {
        return next(new CustomError("id missing",401,AppError.ValidationError));
      }
      console.log("emp id",id);

      const service=await this.getServicePayment.execute(id)

    return res.status(200).json({ message: "success",succes:true,service });
    } catch (error) {
      console.log("error userlogout", error);
      return next(error);
    }
  }

}