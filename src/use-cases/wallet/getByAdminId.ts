import { WalletEntities } from "../../entities/walletEntities";
import { IwalletRepositories } from "../../interfaces/repositories/wallet/Iwalletrepositories";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";


export class AdminGetWalletuseCase{
    constructor(
        private walletrepositories:IwalletRepositories
    ){}
    async execute():Promise<WalletEntities>{
        const wallet=await this.walletrepositories.findByAdmin()
        if(!wallet)throw new CustomError('not found',404,AppError.ResourceNotFound)
            return wallet
    }
}