import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { hashpass } from "../../../utils/hashPassword";

export class NewPassword {
  constructor(private userRep: IUserRepositories) {}

  async execute(email: string, password: string) {
    const user = await this.userRep.findByemail(email);
    if (!user)
      throw new CustomError("User Not found", 404, AppError.UserNotFound);
    const hash = await hashpass(password);
    await this.userRep.findByIdAndUpdatePassword(user.id, hash);
    return true;
  }
}
