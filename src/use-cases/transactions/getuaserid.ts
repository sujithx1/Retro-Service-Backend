import { TransactionEntities } from "../../entities/transactionEntities";
import { ItransactionRepositories } from "../../interfaces/repositories/transaction/ItransactionRepositories";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";


export class Transaction_getbyuserId{
    constructor(
        private transactionrepositories:ItransactionRepositories
    ) {
        
    }
    async execute(userId:string):Promise<TransactionEntities[]>
    {
        const transaction=await this.transactionrepositories.findbyUserId(userId)
        if(transaction.length==0) throw new CustomError("Transaction not found",401,AppError.ResourceNotFound)

            return  transaction
        
    }
}