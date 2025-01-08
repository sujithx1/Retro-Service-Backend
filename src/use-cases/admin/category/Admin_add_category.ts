import { CategoryEntities } from "../../../entities/CategoryEntities";
import { ICategories_admin_Repositories } from "../../../interfaces/repositories/admin/categories/categoryRepositories";

export class Admin_add_Category_useCase{
    constructor(private categoryRepositoris:ICategories_admin_Repositories) {}

    async execute(name:string,description:string):Promise<CategoryEntities>
    {
        const existCategory=await this.categoryRepositoris.categoryFindbyName(name)
        if (existCategory) throw new Error('Category Already Exists')

          
         const categoryData=new CategoryEntities("",name,description)
         const category=await this.categoryRepositoris.categoryCreate(categoryData)
         return new CategoryEntities(
            category.id,
            category.name,
            category.description,
            category.isBlock
         )



    }
}