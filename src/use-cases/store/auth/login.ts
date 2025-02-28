import { StoreEntities } from "../../../entities/StoreEntities";
import { IstoreRepositories } from "../../../interfaces/repositories/store/Istorerepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { comparePassword } from "../../../utils/hashPassword";

export class StoreLoginuseCase{
    constructor(
        private storeRepositories:IstoreRepositories
    ) {
        
    }
    async execute(storeId:string,password:string):Promise<StoreEntities>
    {
        const findstore=await this.storeRepositories.findbystoreId(storeId)
        if(!findstore)throw new CustomError('store not found',401,AppError.ResourceNotFound)
        if(findstore.isActive==false)throw new CustomError('store is Blocked',401,AppError.UnauthorizedAccess)
        const compare=await comparePassword(password,findstore.password)
        if(!compare)throw new CustomError("password not match",401,AppError.PasswordNotmatch)
        return findstore
        
    }
}