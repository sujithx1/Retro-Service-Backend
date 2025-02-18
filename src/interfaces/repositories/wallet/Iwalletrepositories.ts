import { WalletEntities } from "../../../entities/walletEntities";


export interface IwalletRepositories{

    findByuserId(userId:string):Promise<WalletEntities | null>
    findByEmployeeId(userId:string):Promise<WalletEntities | null>
    findById(id:string):Promise<WalletEntities | null>
    findByIdandUpdate(wallet:WalletEntities):Promise<WalletEntities | null>
    findByIdandDecrementBalance(wallet:WalletEntities):Promise<WalletEntities | null>
    findByuserIdandUpdate(wallet:WalletEntities):Promise<WalletEntities | null>
    create(wallet:WalletEntities):Promise<WalletEntities | null>
    findByAdmin():Promise<WalletEntities | null >
}
