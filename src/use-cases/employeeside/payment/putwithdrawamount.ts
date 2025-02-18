import { TransactionEntities } from "../../../entities/transactionEntities";
import { WalletEntities } from "../../../entities/walletEntities";
import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";
import { ItransactionRepositories } from "../../../interfaces/repositories/transaction/ItransactionRepositories";
import { IwalletRepositories } from "../../../interfaces/repositories/wallet/Iwalletrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class Employee_putwithrdawamountuseCase{
    constructor(
        private walletrepositories:IwalletRepositories,
        private employeerepositories:IEmployeeRepositories,
        private transactionrepositoires:ItransactionRepositories
    ) {
        
    }
    async execute(empId:string,amount:number):Promise<WalletEntities>
 {

    const wallet=await this.walletrepositories.findByEmployeeId(empId)
    if(!wallet)throw new CustomError("wallet not found",401,AppError.ResourceNotFound)
    wallet.balance=amount
const updateWallet=await this.walletrepositories.findByIdandUpdate(wallet)
if(!updateWallet) throw new CustomError("wallet not updated",401,AppError.ServerError)

const updateemployeerevenu=await this.employeerepositories.findIdAndDecrementRevenue(empId,amount)
if(!updateemployeerevenu) throw new CustomError("employee not updated",401,AppError.ServerError)

    const transaction=new TransactionEntities(
        "",
        empId,
        "withdrawal",
        amount,
        "complete",
        "wallet",
        "add"


    
    )
    await this.transactionrepositoires.create(transaction)

    return updateWallet

    

    }
}