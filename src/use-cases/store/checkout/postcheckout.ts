import { CheckoutEntities } from "../../../entities/checkoutEntities";
import { TransactionEntities } from "../../../entities/transactionEntities";
import { Icartrepositories } from "../../../interfaces/repositories/cart/Icartrepositories";
import { IcheckoutRepositories } from "../../../interfaces/repositories/checkout/icheckoutRepositories";
import { ItransactionRepositories } from "../../../interfaces/repositories/transaction/ItransactionRepositories";
import { IwalletRepositories } from "../../../interfaces/repositories/wallet/Iwalletrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export class CheckOut_useCase{
    constructor(
        private checkoutrepositories:IcheckoutRepositories,
        private cartrepositoires:Icartrepositories,
        private transactionrepositories:ItransactionRepositories,
        private walletrepositories:IwalletRepositories
    ) {
        
    }
    async execute(cartId:string,total:number,paymentMethod:"cod"|"razorpay"|"wallet",transactionId:string):Promise<CheckoutEntities>{

        const cart=await this.cartrepositoires.findById(cartId)
        if(!cart) throw new CustomError("Cart not Found",404,AppError.ResourceNotFound);


        const products=cart.products
        
        const checkoutEntity=new CheckoutEntities(
            "",
            cart.userId.toString(),
            cart.storeId,
            {
                products

            },
          
            total,
            paymentMethod,
            "completed",
            "pending",
            transactionId


        )
        console.log(checkoutEntity); 
        
        const checkout=await this.checkoutrepositories.create(checkoutEntity)


         const usertransaction=new TransactionEntities(
                    "",
                    checkout.userId.toString(),
                    "purchase",
                    Number(total),
                    "complete",
                    paymentMethod as "razorypay" | "wallet" | "cod",
                  "product"
        
                   )
        
                   await this.transactionrepositories.create(usertransaction)
if (paymentMethod=="wallet") {
    const userwallet=await this.walletrepositories.findByuserId(cart.userId.toString())
    if (userwallet) {
     userwallet.balance=-total   
    }
    
    
}

        await this.cartrepositoires.findByIdAndDelete(cart.id)

        return checkout
    }
}