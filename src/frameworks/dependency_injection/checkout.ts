import { CheckoutController } from "../../interfaces/controllers/checkout/checkoutController";
import { CartMongoRepositories } from "../../interfaces/repositories/cart/cartMongorepositories";
import { CheckoutMongoRepositories } from "../../interfaces/repositories/checkout/checkoutMongoRepositories";
import { TransactionMongoRepositories } from "../../interfaces/repositories/transaction/transactionMongoRepositories";
import { WalletMongoRepositories } from "../../interfaces/repositories/wallet/walletMongoepositories";
import { User_getOrderbyIduseCase } from "../../use-cases/store/checkout/getorderById";
import { Orders_getuserIduseCase } from "../../use-cases/store/checkout/getordersbyUserId";
import { CheckOut_useCase } from "../../use-cases/store/checkout/postcheckout";
import { User_orderputuseCase } from "../../use-cases/store/checkout/putorderby";


const checkoutrepositories=new CheckoutMongoRepositories()
const cartrepositoires=new CartMongoRepositories()
const transactionrepositories=new TransactionMongoRepositories()
const walletrepositories=new WalletMongoRepositories()



const postcheckout=new CheckOut_useCase(checkoutrepositories,cartrepositoires,transactionrepositories)
const getordersByuserId=new Orders_getuserIduseCase(checkoutrepositories)
const getorderbyId=new User_getOrderbyIduseCase(checkoutrepositories)
const putchekcoutorder=new User_orderputuseCase(checkoutrepositories,walletrepositories,transactionrepositories)

export const checkoutController=new CheckoutController(postcheckout,getordersByuserId,getorderbyId,putchekcoutorder)