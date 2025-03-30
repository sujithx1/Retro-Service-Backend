import { Report_feedBack_User_Entities } from "../../../entities/Report_FeedBack_user";
import { TransactionEntities } from "../../../entities/transactionEntities";
import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";
import { IreqservicemechanicsRepositories } from "../../../interfaces/repositories/reqservicemechanics/Ireqservicesmechrepositories";
import { ItransactionRepositories } from "../../../interfaces/repositories/transaction/ItransactionRepositories";
import { IReport_FeedBack_user_Repositories } from "../../../interfaces/repositories/userSide/feed-back-employee/IFeedBack_user_repositories";
import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";
import { IwalletRepositories } from "../../../interfaces/repositories/wallet/Iwalletrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export class Admin_putfeedBackrefunduseCase {
  constructor(
    private userRepositories: IUserRepositories,
    private employeeRepositories: IEmployeeRepositories,
    private Walletrepositories: IwalletRepositories,
    private feedbackRepositories: IReport_FeedBack_user_Repositories
    ,private serviceRepositories:IreqservicemechanicsRepositories,
    private transactionRepositories:ItransactionRepositories
  ) {}

  async execute(feedbackId: string): Promise<Report_feedBack_User_Entities> {
    const feedback = await this.feedbackRepositories.findbyId(feedbackId);
    if (!feedback)
      throw new CustomError(
        "Feedback Not Found",
        401,
        AppError.ResourceNotFound
      );
    console.log("find feed back ", feedback);

    const user = await this.userRepositories.findById(feedback.user);
    if (!user)
      throw new CustomError("user Not Found", 401, AppError.UserNotFound);

    const employee = await this.employeeRepositories.findById(
      feedback.employee
    );
    if (!employee)
      throw new CustomError("employee Not Found", 401, AppError.UserNotFound);

    const userwallet = await this.Walletrepositories.findByuserId(user.id);
    if (!userwallet)
      throw new CustomError(
        "user wallet Not Found",
        401,
        AppError.ResourceNotFound
      );

    const adminwallet = await this.Walletrepositories.findByAdmin();
    if (!adminwallet)
      throw new CustomError(
        " admin wallet Not Found",
        401,
        AppError.ResourceNotFound
      );


    feedback.amount ? (userwallet.balance = feedback.amount) : userwallet;

    feedback.amount ? (adminwallet.balance = -feedback.amount) : adminwallet;
    const updateadminwallet =
      await this.Walletrepositories.findByIdandDecrementBalance(adminwallet);
    if (!updateadminwallet)
      throw new CustomError(
        "admin wallet Not updated",
        500,
        AppError.ServerError
      );

    const updateuserWallet = await this.Walletrepositories.findByIdandUpdate(
      userwallet
    );
    if (!updateuserWallet)
      throw new CustomError(
        "user wallet Not updated",
        401,
        AppError.ServerError
      );

    const update = await this.feedbackRepositories.findByIdAndupdate(feedback);
    if (!update)
      throw new CustomError("Feedback Not updated", 401, AppError.ServerError);

    const service=await this.serviceRepositories.findbyId(feedback.bookingId)
    if(!service)throw new CustomError(
        "servive Not Found",
        401,
        AppError.ResourceNotFound
      );
      service.status="CANCELLED"

      const updateservice=await this.serviceRepositories.findByIdAndUpdateCancellBooking(service)
      if(!updateservice) throw new CustomError(
        "service Not updated",
        401,
        AppError.ServerError
      );

      const usertranasaction=new TransactionEntities(
        "",
        user.id.toString(),
        "refund",
        100,
        "complete",
        "razorypay",
        "service"

      )

await  this.transactionRepositories.create(usertranasaction)



    return update
  }
  
}
