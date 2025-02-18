import { TransactionEntities } from "../../../entities/transactionEntities";
import { TransactionModel } from "../../../frameworks/db/models/transactionHistory.model";
import { ItransactionRepositories } from "./ItransactionRepositories";


export class TransactionMongoRepositories implements ItransactionRepositories{
  async  create(transaction: TransactionEntities): Promise<TransactionEntities> {
    const service=await TransactionModel.create(transaction)
     return new TransactionEntities(
        service.id,
        service.userId._id.toString(),
        service.type,
        service.amount,
        service.status,
        service.paymentMethod,
        service.serviceType,
        service.createdAt,
        service.updatedAt
     )
        
    }
async findById(id: string): Promise<TransactionEntities | null> {
    const service=await TransactionModel.findById(id)
    if(!service) return null

    return new TransactionEntities(
        service.id,
        service.userId._id.toString(),
        service.type,
        service.amount,
        service.status,
        service.paymentMethod,
        service.serviceType,
        service.createdAt,
        service.updatedAt
     )
    
}
async findByidAndUpdate(transaction: TransactionEntities): Promise<TransactionEntities | null> {
    const service=await TransactionModel.findByIdAndUpdate(transaction.id,{
        type:transaction.type,
        amount:transaction.amount,
        status:transaction.status,
        paymentMethod:transaction.paymentMethod,
        serviceType:transaction.serviceType,
    },{new:true,upsert:true})

    if(!service) return null

    return new TransactionEntities(
        service.id,
        service.userId._id.toString(),
        service.type,
        service.amount,
        service.status,
        service.paymentMethod,
        service.serviceType,
        service.createdAt,
        service.updatedAt
     )


    

    
}


async findbyUserId(userId: string): Promise<TransactionEntities[]> {
    const servcie=await TransactionModel.find({userId:userId})
    return servcie.map((item)=>new TransactionEntities(
        item.id,
        item.userId._id.toString(),
        item.type,
        item.amount,
        item.status,
        item.paymentMethod,
        item.serviceType,
        item.createdAt,
        item.updatedAt


    ))    
}
}