import { WalletEntities } from "../../entities/walletEntities";
import { IwalletRepositories } from "../../interfaces/repositories/wallet/Iwalletrepositories";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";

export class Employee_getWalletDetails{
    constructor(
        private walletrepositories:IwalletRepositories
    ) {
        
    }

    async execute(empId:string):Promise<WalletEntities>{
        const wallet=await this.walletrepositories.findByEmployeeId(empId)
        if(!wallet)throw new CustomError("wallet not found",401,AppError.ResourceNotFound)

        return wallet
    }
}