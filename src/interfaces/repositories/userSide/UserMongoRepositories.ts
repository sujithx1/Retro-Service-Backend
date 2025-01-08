import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { UserIntities } from "../../../entities/Userentities";
import { EmployeeModel } from "../../../frameworks/db/models/EmployeeModel";
import { UserModel } from "../../../frameworks/db/models/UserModel";
import { IUserRepositories } from "./IUserrRepositories";

export class UserMongodbRepositories implements IUserRepositories {
  async findByemail(email: string): Promise<UserIntities | null> {
    console.log(email)
    
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return null;
    }
    return new UserIntities(
      user.id,
      user.username,
      user.email,
      user.phone,
      user.password,
      user.isActive,
      user.profilePic,
      user.isAdmin,
      user.authSource,
      user.role,
      user.createdAt,
      user.updatedAt
    );
  }
  async save(user: UserIntities): Promise<UserIntities> {
  const newuser=  await UserModel.create(user);
  return new UserIntities(
    newuser.id,
      newuser.username,
      newuser.email,
      newuser.phone,
      newuser.password,
      newuser.isActive,
      newuser.profilePic,
      newuser.isAdmin,
      newuser.authSource,
      newuser.role,
      newuser.createdAt,
      newuser.updatedAt
  )
  }
 async findById(id: string): Promise<UserIntities|null> {
  const user=await UserModel.findById(id)
  if(!user)return null
  return new UserIntities(
    user.id,
    user.username,
    user.email,
    user.phone,
    user.password,
    user.isActive,
    user.profilePic,
    user.isAdmin,
    user.authSource,
    user.role,
    user.createdAt,
    user.updatedAt
  )
      
  }

  async findByIdAndUpdate(user: UserIntities): Promise<UserIntities|null> {

    const userData=await UserModel.findByIdAndUpdate(user.id,{

      username:user.username,
      phone:user.phone,
      profilePic:user.profilePic,

      
      
    },{new:true}
  )
  if(!userData) return null

  return new UserIntities(
    userData.id,
    userData.username,
    userData.email,
    userData.phone,
    userData.password,
    userData.isActive,
    userData.profilePic,
    userData.isAdmin,
    userData.authSource,
    userData.role,
    userData.createdAt,
    userData.updatedAt
  )

      
  }

  async findByIdAndUpdatePassword(id: string, password: string):Promise<void | null> {
    const user=await UserModel.findByIdAndUpdate(id,{password:password},{new:true})
    if(!user)return null
    
      
  }
  async findEmployees(): Promise<EmployeeEntities[]> {
      const employees=await EmployeeModel.find()
      return employees.map(
        (item) =>
          new EmployeeEntities(
            item.id,
            item.username,
            item.email,
            item.phone,
            item.password,
            item.skills,
            item.experience,
            item.isActive,
            item.profilePic,
            item.location,
            item.authSource,
            item.role,
            item.createdAt,
            item.updatedAt
          )
      )
  }
}
