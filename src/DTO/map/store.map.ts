import { StoreEntities } from "../../entities/StoreEntities";
import { StoreResponseDto } from "../dto";



export class StoreMap{
    static toResponse(store:StoreEntities):StoreResponseDto{
      

        return {
            id:store.id,
            name:store.name,
            owner_email:store.owner_email,
            owner_name:store.owner_name,
            owner_phone:store.owner_phone,
            location:store.location,
            profile_pic:store.profile_pic,
            isActive:store.isActive,
            storeId:store.storeId,
            createdAt:store.createdAt,
            updatedAt:store.updatedAt
        }
    }
}   