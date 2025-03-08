import { CheckoutEntities } from "../../../entities/checkoutEntities";
import { IcheckoutRepositories } from "../../../interfaces/repositories/checkout/icheckoutRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export class User_getOrderbyIduseCase {
  constructor(private orderrepositories: IcheckoutRepositories) {}

  async execute(id: string): Promise<CheckoutEntities> {
    const order = await this.orderrepositories.findById(id);

    if (!order)
      throw new CustomError("order not found", 404, AppError.ResourceNotFound);

    return order;
  }
}
