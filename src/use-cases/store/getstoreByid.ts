import { StoreEntities } from "../../entities/StoreEntities";
import { IstoreRepositories } from "../../interfaces/repositories/store/Istorerepositories";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";

export class Store_getiduseCase{
    constructor(
        private storerepositories:IstoreRepositories
    ) {
        
    }


    async execute(id:string):Promise<StoreEntities>{
        const store=await this.storerepositories.findbyId(id);
        if(!store) throw new CustomError("Store not Found",404,AppError.ResourceNotFound);

        return store;
    }
}