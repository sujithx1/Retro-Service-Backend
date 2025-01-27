import { IEmployeeRepositories } from "../../interfaces/repositories/employeeside/IEmployeRepositories";
import { CustomError } from "../../utils/errors/custom.errors";
import { AppError } from "../../utils/errors/error.enum";
import { hashpass } from "../../utils/hashPassword";

export class Emp_NewPassword {
  constructor(private userRep: IEmployeeRepositories) {}

  async execute(email: string, password: string) {
    const user = await this.userRep.findByEmail(email);
    if (!user)
      throw new CustomError("User Not found", 404, AppError.UserNotFound);
    const hash = await hashpass(password);
    await this.userRep.findByIdAndUpdatePassword(user.id, hash);
    return true;
  }
}
