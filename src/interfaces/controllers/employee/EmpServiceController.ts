import { NextFunction, Request, Response } from "express";
import { EmpgetReqservice_useCase } from "../../../use-cases/userside/service/getreqservicewithemployeeid.usecase";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { Accept_reqServiceEmployee } from "../../../use-cases/employeeside/service_booking/put_acceptreqacceptEmployee";
import { Emp_getPaymentDetails } from "../../../use-cases/employeeside/payment/getPaymentDetails";
import { Transaction_getbyuserId } from "../../../use-cases/transactions/getuaserid";
import { Employee_putwithrdawamountuseCase } from "../../../use-cases/employeeside/payment/putwithdrawamount";
import { Employee_getWalletDetails } from "../../../use-cases/wallet/getbyemployeeId";
import { io } from "../../../app";



export class EmpServiceController{
    constructor(    
        private getemployeeReqservice:EmpgetReqservice_useCase,
        private putEmployeeReqservice:Accept_reqServiceEmployee,
        private getServicePayment:Emp_getPaymentDetails,
        private gettranasactionByuser:Transaction_getbyuserId,
        private putwithrdrawamount:Employee_putwithrdawamountuseCase,
        private getwalletemployee:Employee_getWalletDetails
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
      
      
      const reqService =await this.getemployeeReqservice.execute(id);

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
      const {status,employeeId}=req.body;
      console.log(req.body);
      
      if (!status||!employeeId) {
        return next(new CustomError("missing fields",401,AppError.ValidationError));
        
      }
      if (!id) {
        return next(new CustomError("id missing",401,AppError.ValidationError));
      }
      console.log("emp id",id);
     
      
      const reqService =await this.putEmployeeReqservice.execute(id,employeeId,status);
      io.emit("confirmBooking",{id});

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

      const service=await this.getServicePayment.execute(id);

    return res.status(200).json({ message: "success",succes:true,service });
    } catch (error) {
      console.log("error userlogout", error);
      return next(error);
    }
  }
    
  async employeeService_getTransacationhistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("  transaction controller");

   
     
      const{id}=req.params;
      if(!id) return next(new CustomError("missing field",401,AppError.ValidationError));
 
       const transactions=await this.gettranasactionByuser.execute(id);
       console.log("transactions ",transactions);

    return res.status(200).json({ message: "success",succes:true,transactions });
    } catch (error) {
      console.log("error userlogout", error);
      return next(error);
    }
  }
    
  async employeeService_putWithdrawamountitoWallet(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("  transaction controller");

   
     
      const{id}=req.params;
      if(!id) return next(new CustomError("missing id",401,AppError.ValidationError));
        const{amount}=req.body;
      if(!amount)return next(new CustomError("missing amount",401,AppError.ValidationError));
 
       const wallet=await this.putwithrdrawamount.execute(id,amount);
       console.log("transactions ",);

    return res.status(200).json({ message: "success",succes:true,wallet });
    } catch (error) {
      console.log("error userlogout", error);
      return next(error);
    }
  }
    
  async employeeService_getWalletdetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("  transaction controller");

   
     
      const{id}=req.params;
      if(!id) return next(new CustomError("missing id",401,AppError.ValidationError));
      
       const wallet=await this.getwalletemployee.execute(id);

    return res.status(200).json({ message: "success",succes:true,wallet });
    } catch (error) {
      console.log("error userlogout", error);
      return next(error);
    }
  }

}