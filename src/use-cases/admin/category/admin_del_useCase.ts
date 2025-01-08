import { CategoryEntities } from "../../../entities/CategoryEntities";
import { ICategories_admin_Repositories } from "../../../interfaces/repositories/admin/categories/categoryRepositories";

export class Admin_Del_Category_useCase {
  constructor(private categoryRepositories: ICategories_admin_Repositories) {}

  async execute(id: string): Promise<CategoryEntities> {
    const category = await this.categoryRepositories.categoryFindbyId(id);
    if (!category) throw new Error("id not  valid");

    console.log(category);
    if (category.isBlock === undefined || category.isBlock === null) {
        throw new Error("isBlock field is missing or invalid");
    }
    
    category.isBlock =!category.isBlock
    console.log(category);
    
    const updatecategory =
      await this.categoryRepositories.categoryFindbyIdAndUpdate(category);
      console.log(updatecategory);
      
    if (!updatecategory) throw new Error("Not Updated");
    return new CategoryEntities(
      updatecategory.id,
      updatecategory.name,
      updatecategory.description,
      updatecategory.isBlock
    );
  }
}
