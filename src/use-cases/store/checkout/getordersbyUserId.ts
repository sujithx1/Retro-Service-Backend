import { CheckoutEntities } from "../../../entities/checkoutEntities";
import { IcheckoutRepositories } from "../../../interfaces/repositories/checkout/icheckoutRepositories";
// import { CustomError } from "../../../utils/errors/custom.errors";
// import { AppError } from "../../../utils/errors/error.enum";

export class Orders_getuserIduseCase {
  constructor(private checkoutrepositoires: IcheckoutRepositories) {}

  async execute(userId: string): Promise<CheckoutEntities[]> {
    const orders=await this.checkoutrepositoires.findByuserId(userId);
    
    // if(orders.lengt./h==0)throw new CustomError("Please Order ",404,AppError.ResourceNotFound)

        return orders;
    
  }
}
