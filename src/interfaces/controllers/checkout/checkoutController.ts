import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { CheckOut_useCase } from "../../../use-cases/store/checkout/postcheckout";
import { Orders_getuserIduseCase } from "../../../use-cases/store/checkout/getordersbyUserId";
import { User_getOrderbyIduseCase } from "../../../use-cases/store/checkout/getorderById";
import { User_orderputuseCase } from "../../../use-cases/store/checkout/putorderby";

export class CheckoutController {
  constructor(
    private postcheckout: CheckOut_useCase,
    private getordersByuserId: Orders_getuserIduseCase,
    private getorderbyId:User_getOrderbyIduseCase,
    private putOrder:User_orderputuseCase
  ) {}

  async _postCheckout(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartId, total, paymentMethode, transactionId } = req.body;
      console.log(req.body);
      

      if (!cartId || !total || !paymentMethode || !transactionId)
        return next(
          new CustomError("missing field", 401, AppError.ValidationError)
        );
      const checkout = await this.postcheckout.execute(
        cartId,
        Number(total),
        paymentMethode,
        transactionId
      );
      return res.status(201).json({ success: true, checkout });
    } catch (error) {
      return next(error);
    }
  }




  async _getOrdersbyUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id)
        return next(
          new CustomError("missing id", 401, AppError.ValidationError)
        );
      const orders =await this.getordersByuserId.execute(id);
      return res.status(200).json({ success: true, orders });
    } catch (error) {
      return next(error);
    }
  }

  async _getOrdersbyId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id)
        return next(
          new CustomError("missing id", 401, AppError.ValidationError)
        );
      const order =await this.getorderbyId.execute(id);
      return res.status(200).json({ success: true, order });
    } catch (error) {
      return next(error);
    }
  }

  async _putOrdercancellReject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(req.body);
      
      const {status,concern}=req.body

      if (!id)
        return next(
          new CustomError("missing id", 400, AppError.ValidationError)
        );
      if (!status)
        return next(
          new CustomError("missing field", 400, AppError.ValidationError)
        );
        if(status==="rejected"&&!concern)
            {
            return next(
              new CustomError("missing concern", 400, AppError.ValidationError)
            );
  
          }
      const order =await this.putOrder.execute(id,status,concern);
      return res.status(200).json({ success: true, order });
    } catch (error) {
      return next(error);
    }
  }




  
}
