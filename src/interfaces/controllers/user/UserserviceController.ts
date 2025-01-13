import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { ReqEmployeeServices_useCase } from "../../../use-cases/userside/service/req.employeeservice";
import { User_getReqServiceuseCase } from "../../../use-cases/userside/service/get_req_service";
import Razorpay from "razorpay";
import { UserServiceRazorpayPayment } from "../../../use-cases/userside/payments/serviceRazorpayuseCase";
import { UserServiceBookingHistoryusecase } from "../../../use-cases/userside/payments/getSevicePaymentCompleted";

export class UserServiceController {
  constructor(
    private createrewservicesmech: ReqEmployeeServices_useCase,
    private getreqServiceUsecase: User_getReqServiceuseCase,
    private createServicepayment: UserServiceRazorpayPayment,
    private getbookingHistory: UserServiceBookingHistoryusecase
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
        key_id: process.env.RazorPayId || "",
        key_secret: process.env.RazorPaySecret,
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

      const {
        name,
        vehicleNumber,
        problem,
        phone,
        amount,
        employeeId,
        userId,
        jobName,
        serviceId
      } = req.body;
      if (
        !name ||
        !vehicleNumber ||
        !problem ||
        !phone ||
        !amount ||
        !employeeId ||
        !userId||
        !jobName||
        !serviceId
      )
        return next(
          new CustomError("Missing fields", 401, AppError.ValidationError)
        );

      console.log(req.body);

      const servicepayment = await this.createServicepayment.execute(
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
      console.log(history);
      

      return res
        .status(200)
        .json({ message: "success", success: true, history });
    } catch (error) {
      return next(error);
    }
  }
}
