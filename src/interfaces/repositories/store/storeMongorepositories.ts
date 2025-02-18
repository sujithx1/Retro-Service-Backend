import { StoreEntities } from "../../../entities/StoreEntities";
import { StoreModel } from "../../../frameworks/db/models/Storemodel";
import { IstoreRepositories } from "./Istorerepositories";

const returnstore = (store: StoreEntities): StoreEntities => {
  return new StoreEntities(
    store.id,
    store.name,
    store.owner_name,
    store.owner_email,
    store.owner_phone,
    store.isActive,
    store.password,
    store.storeId,
    store.profile_pic,
    store.location,
    store.createdAt,
    store.updatedAt
  );
};

export class StoreMongoRepositories implements IstoreRepositories {
  async findByowner_email(email: string): Promise<StoreEntities | null> {
    const store = await StoreModel.findOne({ owner_email: email })
    if (!store) return null;

    return returnstore(store as StoreEntities)   
  }
  async findbyId(id: string): Promise<StoreEntities | null> {
    const store=await StoreModel.findById(id)
    if(!store)return null
    return returnstore(store as StoreEntities)   
  }
  async create(storeData: StoreEntities): Promise<StoreEntities> {
      const store=await StoreModel.create(storeData)
      return returnstore(store as StoreEntities)   
  }
}
