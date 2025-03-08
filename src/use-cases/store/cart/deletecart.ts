import { IProduct } from "../../../frameworks/db/models/ProductModel";
import { Icartrepositories } from "../../../interfaces/repositories/cart/Icartrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class Cart_deleteCartid{
    constructor(
        private cartrepositories:Icartrepositories
    ) {}

    async execute(cartId:string,productId:string):Promise<boolean>{

        const cart=await this.cartrepositories.findById(cartId)
        if(!cart)throw new CustomError("cart not found ",404,AppError.ServerError);


           // Check if the product exists in the cart
           const productIndex = cart.products.findIndex(
            (product) => typeof product.product === 'object' && '_id' in product.product && product.product._id.toString() === productId
        );

        if (productIndex === -1) {
            throw new CustomError("Product not found in cart", 404, AppError.ResourceNotFound);
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        const updatedCart = await this.cartrepositories.findByIdUpdate(cart);
        if (!updatedCart) {
            throw new CustomError("Failed to update cart", 500, AppError.ServerError);
        }


        if (cart.products.length==0) {
            await this.cartrepositories.findByIdAndDelete(cart.id)
        }




        return true
         

    }
}