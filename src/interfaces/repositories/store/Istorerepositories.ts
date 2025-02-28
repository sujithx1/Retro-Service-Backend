import { StoreEntities } from "../../../entities/StoreEntities";
import { Locationuser_types } from "../../../types/user";

export interface IstoreRepositories{
    findbyId(id:string):Promise<StoreEntities|null>
    findbystoreId(id:string):Promise<StoreEntities|null>
    findByowner_email(email:string):Promise<StoreEntities|null>
    create(storeData:StoreEntities):Promise<StoreEntities>
    findandlocationAndupdate(id:string,location:Locationuser_types):Promise<StoreEntities|null>
    findAll():Promise<StoreEntities[]>
    find20Km(location:{lat:number,lng:number}):Promise<StoreEntities[]>

}