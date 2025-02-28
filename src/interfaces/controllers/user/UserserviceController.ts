import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { ReqEmployeeServices_useCase } from "../../../use-cases/userside/service/req.employeeservice";
import { User_getReqServiceuseCase } from "../../../use-cases/userside/service/get_req_service";
import Razorpay from "razorpay";
import { UserServiceRazorpayPayment } from "../../../use-cases/userside/payments/serviceRazorpayuseCase";
import { User_putReqserviceUsecase } from "../../../use-cases/userside/service/putReqserviceuseCase";
import { User_getServiceBookingHistoryByUserId } from "../../../use-cases/userside/payments/getservicebookingHistory";
import { Emp_getPaymentDetails } from "../../../use-cases/employeeside/payment/getPaymentDetails";
import { User_serchjobsuseCase } from "../../../use-cases/userside/service/searchservices";
import { startBookingCronJob } from "../../../utils/helper/db_helper/cronjobReject";
import { User_getNearestEmployees } from "../../../use-cases/userside/service/getnearestEmployees10km";
import { User_putserviceSpecificEmp } from "../../../use-cases/userside/service/putservicesendsecficemp";
import { User_CompleteServiceBooking_payment } from "../../../use-cases/userside/payments/putservicepaymentComplete";
import { startBookingCronJob3min } from "../../../utils/helper/db_helper/cronjobCancelling";
import { Transaction_getbyuserId } from "../../../use-cases/transactions/getuaserid";
import { io } from "../../../app";

export class UserServiceController {
  constructor(
    private createrewservicesmech: ReqEmployeeServices_useCase,
    private getreqServiceUsecase: User_getReqServiceuseCase,
    private putServicepaymentComplete: User_CompleteServiceBooking_payment,
    private getbookingHistory: User_getServiceBookingHistoryByUserId,
    private putReqserviceuseCase: User_putReqserviceUsecase,
    private getServicePayment: Emp_getPaymentDetails,
    private getsrachjobsUser: User_serchjobsuseCase,
    private getNearestEmployees: User_getNearestEmployees,
    private putserviceSpecificemp:User_putserviceSpecificEmp,
    private createServicePayment:UserServiceRazorpayPayment,
    private gettranasactionByuser:Transaction_getbyuserId
  ) {}

  async reqserviceEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        userId,
        userName,
        userEmail,
        userLocation,
        jobId,
        jobName,
        Min_wage,
        problem,
      } = req.body;
      if (
        !userId ||
        !userName ||
        !userEmail ||
        !userLocation ||
        !jobId ||
        !jobName ||
        !Min_wage ||
        !problem
      ) {
        return next(
          new CustomError("missing filed", 401, AppError.ValidationError)
        );
      }

      console.log(
        userId,
        userName,
        userEmail,
        userLocation,
        jobId,
        jobName,
        Min_wage,
        problem
      );

      const reqService = await this.createrewservicesmech.execute(
        userId,
        userEmail,
        userName,
        userLocation,
        jobId,
        jobName,
        Min_wage,
        problem
      );
      console.log(reqService);
      startBookingCronJob();
    
      return res
        .status(201)  
        .json({ message: "success", succes: true, reqService: reqService });
    } catch (error) {
      console.log("reqserviceEmployee error", error);

      return next(error);
    }
  }

  async get_reqServicecontrolle(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("get reqservice controller");

    try {
      const { id } = req.params;
      if (!id)
        return next(
          new CustomError("missing id", 401, AppError.ValidationError)
        );
      const reqService = await this.getreqServiceUsecase.execute(id);
      return res
        .status(200)
        .json({ message: "success", succes: true, reqService });
    } catch (error) {
      return next(error);
    }
  }

  async userServiceRazorpaypayment_Controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { amount, currency, receipt } = req.body;
      if (!amount || !currency || !receipt)
        return next(
          new CustomError("Missing fields", 401, AppError.ValidationError)
        );

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAYID || "",
        key_secret: process.env.RAZORPAYSECRECT,
      });

      const order = await razorpay.orders.create({
        amount: amount * 100, // Amount in paise
        currency: currency,
        receipt: receipt,
      });
      return res.json(order);
    } catch (error) {
      return next(error);
    }
  }

  async userServiceRazorpaypayment_Confirm_Controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("ctroll");
const{id}=req.params
      const {
       
        vehicleNumber,
        phone,
        amount,
      } = req.body;
      if (
        
        !vehicleNumber ||
       
        !phone ||
        !amount 
       
      )
        return next(
          new CustomError("Missing fields", 401, AppError.ValidationError)
        );

        if(!id)return next(new CustomError("Missing Id",401,AppError.ValidationError))
      console.log(req.body);

      const servicepayment = await this.putServicepaymentComplete.execute(
        id,
       
        vehicleNumber,
       
        phone,
        Number(amount),
       
      );

      return res
        .status(200)
        .json({ message: "succes", success: true, servicepayment });
    } catch (error) {
      return next(error);
    }
  }

  async userService_Bookin_history_Controll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      console.log("service booking-hsitory", id);

      if (!id)
        return next(
          new CustomError("Missing field", 401, AppError.ValidationError)
        );
      const history = await this.getbookingHistory.execute(id);

      return res
        .status(200)
        .json({ message: "success", success: true, history });
    } catch (error) {
      return next(error);
    }
  }
  async userService_PutReqservecontroll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!id)
        return next(
          new CustomError("Missing field", 401, AppError.ValidationError)
        );
      if (!status)
        return next(
          new CustomError("Missing status", 401, AppError.ValidationError)
        );
      const service = await this.putReqserviceuseCase.execute(id, status);

      return res
        .status(200)
        .json({ message: "success", success: true, service });
    } catch (error) {
      return next(error);
    }
  }
  async userService_GETservicePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      console.log("service booking-hsitory", id);

      if (!id)
        return next(
          new CustomError("Missing field", 401, AppError.ValidationError)
        );

      const service = await this.getServicePayment.execute(id);
      console.log("service payment", service);

      return res
        .status(200)
        .json({ message: "success", success: true, service });
    } catch (error) {
      return next(error);
    }
  }
  async userService_GETsearch(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("serach controller");

      const searchQuery = (req.query.search as string) || ""; // Get 'search' query parameter
      console.log("service search", searchQuery);

      // if (!searchQuery)
      //   return next(
      //     new CustomError("Missing quary", 401, AppError.ValidationError)
      //   );

      const jobs = await this.getsrachjobsUser.execute(searchQuery);
      // console.log("service payment",service);

      return res
        .status(200)
        .json({ message: "success", success: true, services: jobs });
    } catch (error) {
      return next(error);
    }
  }
  async userService_GETNearestEmployees(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("nearest employees controller");

      const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);

    if (isNaN(lat) || isNaN(lng)) return new CustomError("missing field", 401, AppError.ValidationError);

    
      const employees = await this.getNearestEmployees.execute(lat, lng);
      console.log(employees[0]);
      const employeesWithoutPassword = employees.map((employee) => {
        const { password, ...employeeWithoutPassword } = employee;
        return employeeWithoutPassword;
      });

      return res
        .status(200)
        .json({
          message: "success",
          success: true,
          employees: employeesWithoutPassword,
        });
    } catch (error) {
      return next(error);
    }
  }
  
  async userService_putreqserviceSpesificEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("putservice send on specific emp");
      
      const {id}=req.params
      const {emplId}=req.body
      console.log(id,emplId);
      
      if(!id)return next(new CustomError("missing id",401,AppError.ValidationError))
      if(!emplId)return next(new CustomError("missing field",401,AppError.ValidationError))
        startBookingCronJob3min()
      const service= await this.putserviceSpecificemp.execute(id,emplId)


      return res
        .status(200)
        .json({
          message: "success",
          success: true,
          service
        
        });
    } catch (error) {
      console.log("error user put contrroll",error);
      
      return next(error); 
    }
  }
  async userService_postAdvancePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
     
      const {
        name,
        vehicleNumber,
        problem,
        phone,
        amount,
        employeeId,
        userId,
        jobName,
        serviceId,
      } = req.body;

      if (
        !name ||
        !vehicleNumber ||
        !problem ||
        !phone ||
        !amount ||
        !employeeId ||
        !userId ||
        !jobName ||
        !serviceId
      )
        return next(new CustomError("Missing fields", 401, AppError.ValidationError));
      const servicepayment = await this.createServicePayment.execute(
        name,
        vehicleNumber,
        problem,
        phone,
        Number(amount),
        employeeId,
        userId,
        jobName,
        serviceId
      );

      return res
        .status(201)
        .json({ message: "succes", success: true, servicepayment });


      
    } catch (error) {
      console.log("error user put contrroll",error);
      
      return next(error); 
    }
  }
  async userService_getTransacationhistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      
     console.log("transactions");
     
     const{id}=req.params
     if(!id) return next(new CustomError("missing field",401,AppError.ValidationError))

      const transactions=await this.gettranasactionByuser.execute(id)
      console.log('transactions ',transactions);
      
      res.status(200).json({message:'success',success:true,transactions})
    

      
    } catch (error) {
      console.log("error user put contrroll",error);
      
      return next(error); 
    }
  }
  // async userService_postReportEmp(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
     
  //     const {
  //       name,
  //       vehicleNumber,
  //       problem,
  //       phone,
  //       amount,
  //       employeeId,
  //       userId,
  //       jobName,
  //       serviceId,
  //     } = req.body;

  //     if (
  //       !name ||
  //       !vehicleNumber ||
  //       !problem ||
  //       !phone ||
  //       !amount ||
  //       !employeeId ||
  //       !userId ||
  //       !jobName ||
  //       !serviceId
  //     )
  //       return next(new CustomError("Missing fields", 401, AppError.ValidationError));
  //     const servicepayment = await this.createServicePayment.execute(
  //       name,
  //       vehicleNumber,
  //       problem,
  //       phone,
  //       Number(amount),
  //       employeeId,
  //       userId,
  //       jobName,
  //       serviceId
  //     );

  //     return res
  //       .status(201)
  //       .json({ message: "succes", success: true, servicepayment });


      
  //   } catch (error) {
  //     console.log("error user put contrroll",error);
      
  //     return next(error); 
  //   }
  // }
}
