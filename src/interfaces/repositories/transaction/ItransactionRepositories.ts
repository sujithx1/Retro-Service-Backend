import { TransactionEntities } from "../../../entities/transactionEntities";


export interface ItransactionRepositories{
    findById(id:string):Promise<TransactionEntities|null>
    create(transaction:TransactionEntities):Promise<TransactionEntities>
    findByidAndUpdate(transaction:TransactionEntities):Promise<TransactionEntities|null>
    findbyUserId(userId:string):Promise<TransactionEntities[]>
}