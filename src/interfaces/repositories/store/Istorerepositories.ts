import { StoreEntities } from "../../../entities/StoreEntities";

export interface IstoreRepositories{
    findbyId(id:string):Promise<StoreEntities|null>
    findByowner_email(email:string):Promise<StoreEntities|null>
    create(storeData:StoreEntities):Promise<StoreEntities>

}