import { WalletEntities } from "../../entities/walletEntities";
import { IwalletRepositories } from "../../interfaces/repositories/wallet/Iwalletrepositories";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";

export class Wallet_getuserIduseCase{
    constructor(private walletRepositories:IwalletRepositories) {
        
    }
    async execute(userId:string):Promise<WalletEntities>{

        const wallet =await this.walletRepositories.findByuserId(userId);
        if(!wallet) throw new CustomError("not found",401,AppError.ResourceNotFound);
            return wallet;


    }
}