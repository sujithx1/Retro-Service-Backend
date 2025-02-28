import { StoreEntities } from "../../../entities/StoreEntities";
import { IStore_types, StoreModel } from "../../../frameworks/db/models/Storemodel";
import { Locationuser_types } from "../../../types/user";
import { IstoreRepositories } from "./Istorerepositories";

const returnstore = (store: IStore_types): StoreEntities => {
  return new StoreEntities(
    store._id.toString(),
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
    store.updatedAt,
    
  );
};

export class StoreMongoRepositories implements IstoreRepositories {
  async findByowner_email(email: string): Promise<StoreEntities | null> {
    const store = await StoreModel.findOne({ owner_email: email })
    if (!store) return null;

    return returnstore(store)    
  }
  async findbyId(id: string): Promise<StoreEntities | null> {
    const store=await StoreModel.findById(id)
    if(!store)return null
    return returnstore(store )   
  }
  async create(storeData: StoreEntities): Promise<StoreEntities> {
      const store=await StoreModel.create(storeData)
      return returnstore(store)   
  }


  async findbystoreId(id: string): Promise<StoreEntities | null> {
      const store=await StoreModel.findOne({storeId:id})
      if(!store)return null
      return returnstore(store)
  }



  async findandlocationAndupdate(id: string, location: Locationuser_types): Promise<StoreEntities | null> {
    const storeData=await StoreModel.findByIdAndUpdate(id,{
      location:location
    },{new:true, upsert: true})

    if(!storeData)return null

    return returnstore(storeData)
      
  }



  


  async findAll(): Promise<StoreEntities[]> {
      const stores=await StoreModel.find()

      return stores.map((res)=>returnstore(res))
  }



  
  async calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): Promise<number> {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };
  
  async find20Km(location:Locationuser_types): Promise<StoreEntities[]> {
      try {
        // Find stores that are active and have a valid location
        const stores = await StoreModel.find({
          isActive: true,
          'location.lat': { $exists: true },
          'location.lng': { $exists: true },
        });
    
        // Map stores to include calculated distances
        const storesWithDistances = await Promise.all(
          stores.map(async (store) => {
            const distance =
              store.location?.lat && store.location?.lng
                ? await this.calculateDistance(
                    location.lat,
                    location.lng,
                    store.location.lat,
                    store.location.lng
                  )
                : Infinity; // If location is missing, set to Infinity
    
            return { store, distance };
          })
        );
    
        // Filter stores within 20 km radius
        const nearbyStores = storesWithDistances
          .filter((item) => item.distance <= 20)
          .map((item) => returnstore(item.store)); // Extract `store` before passing
    
        return nearbyStores;
      } catch (error) {
        console.error(error);
        return [];
      }

      
  }


}
