import { CategoryEntities } from "../../../entities/CategoryEntities";
import { ICategories_admin_Repositories } from "../../../interfaces/repositories/admin/categories/categoryRepositories";

export class Admin_get_categories_useCase{
    constructor(private categoryRespositories:ICategories_admin_Repositories) {
        
    }

    async execute():Promise<CategoryEntities[]>{
        return await this.categoryRespositories.findAll();
    }
}

