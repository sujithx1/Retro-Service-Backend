import { TransactionEntities } from "../../entities/transactionEntities";
import { ItransactionRepositories } from "../../interfaces/repositories/transaction/ItransactionRepositories";

export class Get_alltrasactions{
    constructor(
        private trasnctions:ItransactionRepositories
    ) {
        
    }

    async execute():Promise<TransactionEntities[]>{
        const transactions=await this.trasnctions.findAll()
        return transactions
    }
}