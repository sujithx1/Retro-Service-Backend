import { UserIntities } from "../../../entities/Userentities";
import { UserModel } from "../../../frameworks/db/models/UserModel";
import { IUserRepositories } from "./IUserrRepositories";

export class UserMongodbRepositories implements IUserRepositories {
  async findByemail(email: string): Promise<UserIntities | null> {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return null;
    }
    return new UserIntities(
      user.id,
      user.username,
      user.email,
      user.phone,
      user.password
    );
  }
  async save(user: UserIntities): Promise<void> {
    await UserModel.create(user);
  }
}
