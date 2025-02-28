import { CartEntities } from "../../../entities/cartEntities";
import { Icartrepositories } from "../../../interfaces/repositories/cart/Icartrepositories";

export class AddtoCartuseCase {
  constructor(private cartrepositories: Icartrepositories) {}

  async execute(cartData: CartEntities): Promise<CartEntities> {
    return await this.cartrepositories.create(cartData);
  }
}
