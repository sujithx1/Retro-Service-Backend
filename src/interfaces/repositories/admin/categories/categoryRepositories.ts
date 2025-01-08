import { CategoryEntities } from "../../../../entities/CategoryEntities"


export interface ICategories_admin_Repositories{
       findAll():Promise<CategoryEntities[]>
       categoryFindbyName(name:string):Promise<string|null>
       categgoryFindByNameReturnCategory(name:string):Promise<CategoryEntities|null>
        categoryCreate(category:CategoryEntities):Promise<CategoryEntities>
        categoryFindbyId(id:string):Promise<CategoryEntities|null>
        categoryFindbyIdAndUpdate(category:CategoryEntities):Promise<CategoryEntities | null>

        
    
}