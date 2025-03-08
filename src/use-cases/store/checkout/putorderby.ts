import { CheckoutEntities } from "../../../entities/checkoutEntities";
import { TransactionEntities } from "../../../entities/transactionEntities";
import { IcheckoutRepositories } from "../../../interfaces/repositories/checkout/icheckoutRepositories";
import { ItransactionRepositories } from "../../../interfaces/repositories/transaction/ItransactionRepositories";
import { IwalletRepositories } from "../../../interfaces/repositories/wallet/Iwalletrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export class User_orderputuseCase {
  constructor(private orderrepositories: IcheckoutRepositories,
    private walletrepositories:IwalletRepositories,
    private transactionrepositoires:ItransactionRepositories
  ) {}
  async execute(
    id: string,
    status: "returned" | "cancelled"|"completed"|"return-confirmed",
    message?: string
  ): Promise<CheckoutEntities> {
    const findorder = await this.orderrepositories.findById(id);
    if (!findorder)
      throw new CustomError("order not found", 404, AppError.ResourceNotFound);
    findorder.orderStatus = status;
    if (status == "returned") {
      findorder.concern = message;
    }
    if (status==="return-confirmed") {
        // const userIdString = findorder.userId.toString();
        // console.log(userIdString);
        

// Parse the stringified JSON
const userIdString = JSON.stringify(findorder.userId);

console.log(userIdString);
const userIdObject=JSON.parse(userIdString)
console.log(userIdObject);
console.log(userIdObject._id);



// Extract the _id field
// const userId = userObject.id;
// console.log(userId);

        
        const userwallet=await this.walletrepositories.findByuserId(userIdObject._id)
        if (userwallet) {
            userwallet.balance =+ findorder.total;
            const updateWallet=await this.walletrepositories.findByuserIdandUpdate(userwallet)
            if(!updateWallet) throw new CustomError("wallet not updated", 500, AppError.ServerError);

            
                     const usertransaction=new TransactionEntities(
                                "",
                                userIdObject._id,
                                "refund",
                                findorder.total,
                                "complete",
                                "wallet",
                              "product"
                    
                               )
                    
                               await this.transactionrepositoires.create(usertransaction)
          }

        } 
        
    
  const update = await this.orderrepositories.findByIdAndupdate(findorder);

    if (!update)
      throw new CustomError("order not updated", 500, AppError.ServerError);
    return update;
  }

}
