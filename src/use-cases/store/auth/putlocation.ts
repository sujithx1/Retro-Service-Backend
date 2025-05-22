import { IstoreRepositories } from "../../../interfaces/repositories/store/Istorerepositories";
import { Address_Types, Location } from "../../../types/user";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class Store_addlocationuseCase{
    constructor(private storerepositories:IstoreRepositories) {
        
    }

    async execute(id:string,lat:number,lng:number,address:Address_Types):Promise<Location>{

        const store=await this.storerepositories.findbyId(id);
        if(!store)throw new CustomError("store not found",401,AppError.ResourceNotFound);
        const update=await this.storerepositories.findandlocationAndupdate(id,{lat,lng,address});
        if(!update?.location)throw new CustomError("store not updated",401,AppError.ServerError);

        return update.location;

        

    }
}