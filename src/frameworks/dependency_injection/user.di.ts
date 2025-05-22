import { UserMongodbRepositories } from "../../interfaces/repositories/userSide/UserMongoRepositories";
import { CreateUser } from "../../use-cases/userside/auth/createUser";
import { Usercontroller } from "../../interfaces/controllers/user/userController";
import { SendOtp } from "../../use-cases/userside/auth/SendOtp";
import { CheckOtp } from "../../use-cases/userside/auth/otpchecking";
import { UserLogin } from "../../use-cases/userside/auth/userLogin";
import { User_Google_Auth_useCase } from "../../use-cases/userside/auth/Authservice";
import { User_Edit_useCase } from "../../use-cases/userside/edit/UserEdit";
import { User_Put_Image_UseCase } from "../../use-cases/userside/edit/image_useCase";
import { Admin_get_jobs_useCase } from "../../use-cases/admin/jobs/getJobs";
import { Mongo_Job_admin_Repositories } from "../../interfaces/repositories/admin/jobs/mongoJobRepositories";
import { Admin_get_allEmployees_useCase } from "../../use-cases/admin/workerManageMent/get_employees";
import { Mongo_Admin_Employees_Repositories } from "../../interfaces/repositories/admin/employees/Mongo_Empl_repositories";
import { User_Post_Service_booking_useCase } from "../../use-cases/userside/service/user_Service_booking";
import { Mongo_Service_Booking_Repositories } from "../../interfaces/repositories/servicebooking/mongoServiceRepositories";
import { EmployeeMongoRepositories } from "../../interfaces/repositories/employeeside/EmployeMongoRepositories";
import { User_get_Service_Booking_useCase } from "../../use-cases/userside/service/get_service_booking";
import { Report_FeedBack_user_MongoRepositories } from "../../interfaces/repositories/userSide/feed-back-employee/FeedBack_mongo_Repositories";
import { Report_feedBack_user_useCase } from "../../use-cases/userside/report-feedback/Report_feedBack_useCase";
import { Forgot_PasswordotpUseCase } from "../../use-cases/userside/auth/forgototpuseCase";
import { NewPassword } from "../../use-cases/userside/auth/newPassword";
import { UserServiceController } from "../../interfaces/controllers/user/UserserviceController";
import { MongoReqServiceMechnics } from "../../interfaces/repositories/reqservicemechanics/mongoreqservicemechrep";
import { ReqEmployeeServices_useCase } from "../../use-cases/userside/service/req.employeeservice";
import { User_getReqServiceuseCase } from "../../use-cases/userside/service/get_req_service";
import { UserServiceRazorpayPayment } from "../../use-cases/userside/payments/serviceRazorpayuseCase";
import { ServicePaymentMongoRepositories } from "../../interfaces/repositories/payments/mongoservicePaymentRepositories";
import { User_putReqserviceUsecase } from "../../use-cases/userside/service/putReqserviceuseCase";
import { User_getServiceBookingHistoryByUserId } from "../../use-cases/userside/payments/getservicebookingHistory";
import { Emp_getPaymentDetails } from "../../use-cases/employeeside/payment/getPaymentDetails";
import { UserChatcontroller } from "../../interfaces/controllers/user/userChatcontroller";
import { Message_mongoRepositories } from "../../interfaces/repositories/chats/MongoChatsReposotories";
import { User_serchjobsuseCase } from "../../use-cases/userside/service/searchservices";
import { UserLocation_useCase } from "../../use-cases/userside/auth/addlocation";
import { User_getNearestEmployees } from "../../use-cases/userside/service/getnearestEmployees10km";
import { User_putserviceSpecificEmp } from "../../use-cases/userside/service/putservicesendsecficemp";
import { User_CompleteServiceBooking_payment } from "../../use-cases/userside/payments/putservicepaymentComplete";
import { Get_MessagesByuseId } from "../../use-cases/chat/getChatsbyuserId";
import { Employee_get_details_useCase } from "../../use-cases/employeeside/getEmployee";
import { WalletMongoRepositories } from "../../interfaces/repositories/wallet/walletMongoepositories";
import { UserwalletController } from "../../interfaces/controllers/user/userWalletcontroller";
import { Wallet_getuserIduseCase } from "../../use-cases/wallet/getbyuserId";
import { TransactionMongoRepositories } from "../../interfaces/repositories/transaction/transactionMongoRepositories";
import { Transaction_getbyuserId } from "../../use-cases/transactions/getuaserid";
import { AdminGetWalletuseCase } from "../../use-cases/wallet/getByAdminId";
const userRepositories = new UserMongodbRepositories();
const jobRepositories = new Mongo_Job_admin_Repositories();
const Admin_employeeRepositories = new Mongo_Admin_Employees_Repositories();
const employeeRepositories = new EmployeeMongoRepositories();
const serviceRepositories = new Mongo_Service_Booking_Repositories();
const Report_FeedBackRepositoires =
  new Report_FeedBack_user_MongoRepositories();
const reqServiceMechanicsRepositories = new MongoReqServiceMechnics();
const servicepaymentRepositoires = new ServicePaymentMongoRepositories();
const messageRepositories=new Message_mongoRepositories();
const walletRepositories=new WalletMongoRepositories();
const transactionrepositories=new TransactionMongoRepositories();





const createUser = new CreateUser(userRepositories,walletRepositories);
const sendmailOtp = new SendOtp(userRepositories);
const checkotpMail = new CheckOtp();
const Loginuser = new UserLogin(userRepositories);
const googleSignin = new User_Google_Auth_useCase(userRepositories);
const userEdit = new User_Edit_useCase(userRepositories);
const userProfileimage = new User_Put_Image_UseCase(userRepositories);
const getallJobs = new Admin_get_jobs_useCase(jobRepositories);
const getAllEmployees = new Admin_get_allEmployees_useCase(
  Admin_employeeRepositories
);
const PostServiceBooking = new User_Post_Service_booking_useCase(
  serviceRepositories,
  userRepositories,
  jobRepositories,
  employeeRepositories
);
const get_service_booking = new User_get_Service_Booking_useCase(
  serviceRepositories
);
const post_Report_user = new Report_feedBack_user_useCase(
  Report_FeedBackRepositoires
);
const forgotUserCase = new Forgot_PasswordotpUseCase(userRepositories);
const newPassword = new NewPassword(userRepositories);
const userlocation=new UserLocation_useCase(userRepositories);



const createreqservicemechanics = new ReqEmployeeServices_useCase(
  userRepositories,
  employeeRepositories,
  reqServiceMechanicsRepositories
);

const getreqservice = new User_getReqServiceuseCase(
  reqServiceMechanicsRepositories
);

const createServicepayment = new UserServiceRazorpayPayment(
  servicepaymentRepositoires,
  employeeRepositories,
  reqServiceMechanicsRepositories,
  walletRepositories,
  transactionrepositories
  );
  const ConfirmServicePayment=new User_CompleteServiceBooking_payment(
    servicepaymentRepositoires,
    employeeRepositories,
    reqServiceMechanicsRepositories,
    transactionrepositories
  );


const getbookingHistory = new User_getServiceBookingHistoryByUserId(
  reqServiceMechanicsRepositories
);
const cancellBookingService=new User_putReqserviceUsecase(reqServiceMechanicsRepositories);
const getServicePayment=new Emp_getPaymentDetails(servicepaymentRepositoires);
const serachjobsuser=new User_serchjobsuseCase(jobRepositories);
const putserviceSendSpecificEmployee=new User_putserviceSpecificEmp(reqServiceMechanicsRepositories,employeeRepositories);


const getnearestEmployees10km=new User_getNearestEmployees(employeeRepositories);
// messages
const getMessagesByUser=new Get_MessagesByuseId(messageRepositories);
const userGetemployeedetails=new Employee_get_details_useCase(employeeRepositories);




const usergetwallet=new Wallet_getuserIduseCase(walletRepositories);


const gettranasactionByuser=new Transaction_getbyuserId(transactionrepositories);
const getService_booking=new User_getReqServiceuseCase(reqServiceMechanicsRepositories);


const getadminWallet=new AdminGetWalletuseCase(walletRepositories);

export const userController = new Usercontroller(
  createUser,
  sendmailOtp,
  checkotpMail,
  Loginuser,
  googleSignin,
  userEdit,
  userProfileimage,
  getallJobs,
  getAllEmployees,
  PostServiceBooking,
  get_service_booking,
  post_Report_user,
  forgotUserCase,
  newPassword,
  userlocation,
  userGetemployeedetails
);

export const serviceController = new UserServiceController(
  createreqservicemechanics,
  getreqservice,
  ConfirmServicePayment,
  getbookingHistory,
  cancellBookingService,
  getServicePayment,
  serachjobsuser,
  getnearestEmployees10km,
  putserviceSendSpecificEmployee,
  createServicepayment,
  gettranasactionByuser,
  getService_booking
);

export const userChatController=new UserChatcontroller(getMessagesByUser);
export const userWalletController=new UserwalletController(usergetwallet,getadminWallet);
