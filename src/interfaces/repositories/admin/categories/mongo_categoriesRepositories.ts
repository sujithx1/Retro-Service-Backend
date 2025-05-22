import { CategoryEntities } from "../../../../entities/CategoryEntities";
import { CategoryModel } from "../../../../frameworks/db/models/Category_Model";
import { ICategories_admin_Repositories } from "./categoryRepositories";

export class Mongo_catgoriesRepositories implements ICategories_admin_Repositories{
    async categoryCreate(category: CategoryEntities): Promise<CategoryEntities> {
        const categoryData = await CategoryModel.create(category);
        return new CategoryEntities(
          categoryData.id,
          categoryData.name,
          categoryData.description
        );
      }
      async categoryFindbyName(name: string): Promise<string | null> {
        const category = await CategoryModel.findOne({ name: name });
        if (!category) return null;
        return category._id.toString();
      }
      async categoryFindbyId(id: string): Promise<CategoryEntities | null> {
        const category = await CategoryModel.findById(id);
    
        if (!category) {
          return null;
        }
    
        return new CategoryEntities(
          category.id,
          category.name,
          category.description,
          category.isBlock
        );
      }
      async categoryFindbyIdAndUpdate(
        category: CategoryEntities
      ): Promise<CategoryEntities | null> {
        const categoryData = await CategoryModel.findByIdAndUpdate(
          category.id,
          { name: category.name, description: category.description,isBlock:category.isBlock },
          { new: true }
        );
        if (!categoryData) {
            return null;
        }
        categoryData.save();
    
        return new CategoryEntities(
          categoryData.id,
          categoryData.name,
          categoryData.description,
          categoryData.isBlock
        );
      }
   
     async findAll(): Promise<CategoryEntities[]> {
          const categories=await CategoryModel.find();
          

          return categories.map((item)=>new CategoryEntities(item.id,item.name,item.description,item.isBlock));
      }
      async categgoryFindByNameReturnCategory(name: string): Promise<CategoryEntities | null> {
          const category=await CategoryModel.findOne({name});
          if(!category)return null;
          return new CategoryEntities(
            category.id,
            category.name,
            category.description,
            category.isBlock
          );
      }
}