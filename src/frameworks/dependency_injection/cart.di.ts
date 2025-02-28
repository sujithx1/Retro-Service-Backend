import { CartController } from "../../interfaces/controllers/cartcontroller/cartcontroller";
import { CartMongoRepositories } from "../../interfaces/repositories/cart/cartMongorepositories";
import { ProductMongoRepositories } from "../../interfaces/repositories/product/productmongorepositories";
import { AddtoCartuseCase } from "../../use-cases/store/cart/addtoCart";
import { Cart_deleteCartid } from "../../use-cases/store/cart/deletecart";
import { Cart_getProductIduseCase } from "../../use-cases/store/cart/getcartbyProductId";
import { Cart_getUseriduseCase } from "../../use-cases/store/cart/getcartbyUserId";
import { Cart_updateuseCase } from "../../use-cases/store/cart/updatecart";

const cartrepositories=new CartMongoRepositories()
const productrepositories=new ProductMongoRepositories()

const newCart=new AddtoCartuseCase(cartrepositories)
const updatedCart=new Cart_updateuseCase(cartrepositories,
    productrepositories
)

const cartgetuserId=new Cart_getUseriduseCase(cartrepositories)
const cartgetproductId=new Cart_getProductIduseCase(cartrepositories)
const cart_delete=new Cart_deleteCartid(cartrepositories)

export const cartcontroller=new CartController(newCart,updatedCart,cartgetuserId,cartgetproductId,cart_delete)