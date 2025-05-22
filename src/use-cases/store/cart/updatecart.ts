import { CartEntities } from "../../../entities/cartEntities";
import { Icartrepositories } from "../../../interfaces/repositories/cart/Icartrepositories";
import { IproductRepositories } from "../../../interfaces/repositories/product/IproductRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export class Cart_updateuseCase {
  constructor(
    private cartrepositories: Icartrepositories,
    private productrepositories: IproductRepositories
  ) {}

  async execute(
    id: string,
    userId: string,
    storeId: string,
    productId: string,
    quantity: number,
    price: number
  ): Promise<CartEntities> {
    const findCart = await this.cartrepositories.findById(id);
    if (!findCart) {
      throw new CustomError("Cart not found", 404, AppError.ResourceNotFound);
    }

    const findProduct = await this.productrepositories.findById(productId);
    if (!findProduct) {
      throw new CustomError(
        "Product not found",
        404,
        AppError.ResourceNotFound
      );
    }

    const productIndex = findCart.products.findIndex(
        (product) => typeof product.product === "object" && "_id" in product.product && product.product._id.toString() === productId
    );

    if (productIndex === -1) {
        const product={
            product:productId,
      quantity,
      price
        };
        findCart.products.push(product);

    //   throw new CustomError(
    //     "Product not found in cart",
    //     404,
    //     AppError.ResourceNotFound
    //   );

    }else{

        findCart.products[productIndex].quantity = quantity;
        findCart.products[productIndex].price = quantity * findProduct.price;
    }
    

    // Save the updated cart
    const updatedCart = await this.cartrepositories.findByIdUpdate(findCart);
    if (!updatedCart) {
      throw new CustomError("Cart update failed", 500, AppError.ServerError);
    }

    return updatedCart;
  }
}
