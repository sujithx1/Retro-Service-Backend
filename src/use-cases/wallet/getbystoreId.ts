
import { WalletEntities } from "../../entities/walletEntities";
import { IwalletRepositories } from "../../interfaces/repositories/wallet/Iwalletrepositories";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";

export class Wallet_getstoreIduseCase{
    constructor(private walletRepositories:IwalletRepositories) {
        
    }
    async execute(storeId:string):Promise<WalletEntities>{

        const wallet =await this.walletRepositories.findByStoreId(storeId)
        if(!wallet) throw new CustomError("not found",401,AppError.ResourceNotFound)
            return wallet


    }
}