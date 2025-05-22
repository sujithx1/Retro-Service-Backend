import { CategoryEntities } from "../../../entities/CategoryEntities";
import { ICategories_admin_Repositories } from "../../../interfaces/repositories/admin/categories/categoryRepositories";

export class Admin_edit_Category_useCase{
    constructor(private categoryRepositories:ICategories_admin_Repositories) {}

    async execute(id:string,name:string,description:string):Promise<CategoryEntities>{
       
    
        const category= await this.categoryRepositories.categoryFindbyId(id);

        if(!category) throw new Error("Id is not valid");
        const existname=await this.categoryRepositories.categgoryFindByNameReturnCategory(name);
    if (existname) {
        console.log(existname);
        if(category.name!==existname.name)throw new Error("category name already exist");
            
        
    }

       
        category.name=name;
        category.description=description;


         
        console.log(category);
        
            
        const updatecategory=await this.categoryRepositories.categoryFindbyIdAndUpdate(category);
        if(!updatecategory) throw new Error("not Updated");
        return new CategoryEntities(
        updatecategory.id,
        updatecategory.name,
        updatecategory.description,
        updatecategory.isBlock
        );
        
    }

}