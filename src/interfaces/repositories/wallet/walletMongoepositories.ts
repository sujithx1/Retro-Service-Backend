import { WalletEntities } from "../../../entities/walletEntities";
import { WalletModel } from "../../../frameworks/db/models/WalletModel";
import { IwalletRepositories } from "./Iwalletrepositories";


export class WalletMongoRepositories implements IwalletRepositories{

   async findByEmployeeId(userId: string,): Promise<WalletEntities |null> {
const wallet=await WalletModel.findOne({userId,userType:"employee"})
        if(!wallet)return null

    return new WalletEntities(
            wallet.id,
            wallet.userId.toString(),
            wallet.userType as "user"|"employee"|"admin"|"store",
            wallet.balance,
            wallet.createdAt,
            wallet.updatedAt,
    )
    }
  async  findById(id: string): Promise<WalletEntities | null> {
    const wallet=await WalletModel.findById(id)
        if(!wallet)return null

    return new WalletEntities(
            wallet.id,
            wallet.userId.toString(),
            wallet.userType as "user"|"employee"|"admin",    
            wallet.balance,
            wallet.createdAt,
            wallet.updatedAt,
    )
    
          
    } 
  async  findByuserId(userId: string): Promise<WalletEntities |null> {
    const wallet=await WalletModel.findOne({userId,userType:"user"})
        if(!wallet)return null

    return new WalletEntities(
            wallet.id,
            wallet.userId.toString(),
            wallet.userType as "user"|"employee"|"admin",
            wallet.balance,
            wallet.createdAt,
            wallet.updatedAt,
    )
        
    }

    async findByIdandUpdate(wallet: WalletEntities): Promise<WalletEntities | null> {
        const walletData = await WalletModel.findByIdAndUpdate(
            wallet.id,
            {
              $inc: { balance: wallet.balance }, // Fixing the typo
            },
            { new: true, runValidators: true,upsert:true } // Ensures updated document is returned
          );

          if(!wallet)return null
          
          return new WalletEntities(
            walletData.id,
            walletData.userId.toString(),
            walletData.userType as "user"|"employee"|"admin",
            walletData.balance,
            walletData.createdAt,
            walletData.updatedAt,
    )
        
    }

    async findByuserIdandUpdate(wallet: WalletEntities): Promise<WalletEntities | null> {

        const walletData = await WalletModel.findOneAndUpdate(
           {userId:wallet.userId} ,
            {
              $inc: { balance: wallet.balance }, // Fixing the typo
            },
            { new: true, runValidators: true,upsert:true } // Ensures updated document is returned
          );

          if(!wallet)return null
          
          return new WalletEntities(
            walletData.id,
            walletData.userId.toString(),
            walletData.userType as "user"|"employee"|"admin",
            walletData.balance,
            walletData.createdAt,
            walletData.updatedAt,
    )
        
        
    }
   async create(wallet: WalletEntities): Promise<WalletEntities | null> {
    const walletData=await WalletModel.create(wallet)
    return new WalletEntities(
        walletData.id,
        walletData.userId.toString(),
        walletData.userType as "user"|"employee"|"admin",
        walletData.balance,
        walletData.createdAt,
        walletData.updatedAt,
        
    )
        
    }

    async findByAdmin(): Promise<WalletEntities | null> {
        const walletData=await WalletModel.findOne({userType:'admin'})
        if(!walletData) return null
        return new WalletEntities(
            walletData.id,
            walletData.userId.toString(),
            walletData.userType as "user"|"employee"|"admin",
            walletData.balance,
            walletData.createdAt,
            walletData.updatedAt,
        )
        
        
    }
    async findByIdandDecrementBalance(wallet: WalletEntities): Promise<WalletEntities | null> {

        const walletData = await WalletModel.findByIdAndUpdate(
           wallet.id,
             {
               $inc: { balance: -Math.abs(wallet.balance) }, // Fixing the typo
             },
             { new: true, runValidators: true,upsert:true } // Ensures updated document is returned
           );
 
           if(!wallet)return null
           
           return new WalletEntities(
             walletData.id,
             walletData.userId.toString(),
             walletData.userType as "user"|"employee"|"admin",
             walletData.balance,
             walletData.createdAt,
             walletData.updatedAt,
     )
         
        
    }
   async findByStoreId(storeId: string): Promise<WalletEntities | null> {
    const wallet=await WalletModel.findOne({userId:storeId,userType:"store"})
        if(!wallet)return null

    return new WalletEntities(
            wallet.id,
            wallet.userId.toString(),
            wallet.userType as "user"|"employee"|"admin"|"store",
            wallet.balance,
            wallet.createdAt,
            wallet.updatedAt,
    )
        
    }

}