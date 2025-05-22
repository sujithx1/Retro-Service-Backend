import { CategoryEntities } from "../../../entities/CategoryEntities";
import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { JobsEntities } from "../../../entities/JobsEntities";
import { UserIntities } from "../../../entities/Userentities";
import { CategoryModel } from "../../../frameworks/db/models/Category_Model";
import { EmployeeModel } from "../../../frameworks/db/models/EmployeeModel";
import { JobModel } from "../../../frameworks/db/models/JobsModal";
import { UserModel } from "../../../frameworks/db/models/UserModel";
import { IAdminRepositories } from "./Admin_repositories";

export class MongoAdminRepositories implements IAdminRepositories {
  async findByemail(email: string): Promise<UserIntities | null> {
    console.log(email);

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
      user.location,
      user.createdAt,
      user.updatedAt
    );
  }
  async save(user: UserIntities): Promise<UserIntities> {
    const newuser = await UserModel.create(user);
    return new UserIntities(
      newuser.id,
      newuser.username,
      newuser.email,
      newuser.phone,
      newuser.password
    );
  }
  async findAllCategories(): Promise<CategoryEntities[]> {
    const categories = await CategoryModel.find();

    return categories.length?categories.map(
      (item) =>
        new CategoryEntities(item.id, item.name, item.description, item.isBlock)
    ):[];
  }
  async findAllEmployees(): Promise<EmployeeEntities[]> {
    const employees = await EmployeeModel.find();
    return employees.length?employees.map(
      (item) =>
        new EmployeeEntities(
          item.id,
          item.username,
          item.email,
          item.phone,
          item.password,
          item.skills,
          item.experience,
          item.isValidated,
          item.proof,
          item.isActive,
          item.profilePic,
          item.location
         ,
          item.authSource,
          item.role,
          item.revenue,
          item.onDuty,
          item.FCM_Token,

          item.createdAt,
          item.updatedAt
        )
    ):[];
  }
  async findAllJobs(): Promise<JobsEntities[]> {
    const jobs = await JobModel.find();
    return jobs.length?jobs.map(
      (item) =>
        new JobsEntities(
          item.id,
          item.name,
          item.description,
          item.minimum_wage,
          item.isBlock
        )
    ):[];
  }
  async findAllUsers(): Promise<UserIntities[]> {
    const users = await UserModel.find();
    return users.length?users.map(
      (item) =>
        new UserIntities(
          item.id,
          item.username,
          item.email,
          item.phone,
          item.password,
          item.isActive,
          item.profilePic,
          item.isAdmin,
          item.authSource
        )
    ):[];
  }
}
