import { StoreEntities } from "../../entities/StoreEntities";
import { IproductRepositories } from "../../interfaces/repositories/product/IproductRepositories";
import { IstoreRepositories } from "../../interfaces/repositories/store/Istorerepositories";
// import { Locationuser_types } from "../../types/user";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";
interface User_storetypes {
    store: StoreEntities;
    total_product: number;
}

export class Store20kmDistance {
    constructor(
        private storerepositories: IstoreRepositories,
        private productrepositories: IproductRepositories
    ) {}

    async execute(lat: number, lng: number): Promise<User_storetypes[]> {
        const stores = await this.storerepositories.find20Km({ lat, lng });

        if (stores.length === 0) {
            throw new CustomError("No stores Found", 401, AppError.ResourceNotFound);
        }

        // Fetch total products count for each store
        const storesWithProducts = await Promise.all(
            stores.map(async (store) => {
                const products = await this.productrepositories.findBystoreId(store.id);
                let total_product ;
                

                 total_product = products.length; // Count number of products for the store

                return {
                    store,
                    total_product,
                };
            })
        );

        return storesWithProducts;
    }
}
