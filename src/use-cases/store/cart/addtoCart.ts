import { CartEntities } from "../../../entities/cartEntities";
import { Icartrepositories } from "../../../interfaces/repositories/cart/Icartrepositories";

export class AddtoCartuseCase {
  constructor(private cartrepositories: Icartrepositories) {}

  async execute(userId:string,storeId:string,productId:string,quantity:number,price:number): Promise<CartEntities> {
    const products=[{
      product:productId,
      quantity,
      price
    }]
    const cart=new CartEntities(
      "",
      userId,
      storeId,
      products,


          )

            
    return await this.cartrepositories.create(cart);
  }
}
