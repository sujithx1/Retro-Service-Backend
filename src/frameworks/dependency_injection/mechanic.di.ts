import { EmployeeController } from "../../interfaces/controllers/employee/EmployeeController";


import { Mongo_Job_admin_Repositories } from "../../interfaces/repositories/admin/jobs/mongoJobRepositories";
import { EmployeeMongoRepositories } from "../../interfaces/repositories/employeeside/EmployeMongoRepositories";
import { Mongo_Service_Booking_Repositories } from "../../interfaces/repositories/servicebooking/mongoServiceRepositories";
import { Admin_get_jobs_useCase } from "../../use-cases/admin/jobs/getJobs";
import { EmployeeSignup } from "../../use-cases/employeeside/createEmploye";
import { Employee_put_Profile_useCase } from "../../use-cases/employeeside/edit/Emp_put_profile";
import { Emp_Login_useCase } from "../../use-cases/employeeside/Emp_login";
import { Employee_get_details_useCase } from "../../use-cases/employeeside/getEmployee";
import { Employee_put_job_useCase } from "../../use-cases/employeeside/putJobs/emp_put_jobs";
import { EmployeeSendOtp } from "../../use-cases/employeeside/sendotp";
import { Employee_Service_Booking_useCase } from "../../use-cases/employeeside/service_booking/Empl_service_booking";
import { Employee_put_Service_booking_useCase } from "../../use-cases/employeeside/service_booking/put_employee_service_booking";
import { CheckOtp } from "../../use-cases/userside/auth/otpchecking";
import { EmpgetReqservice_useCase } from "../../use-cases/userside/service/getreqservicewithemployeeid.usecase";
import { EmpServiceController } from "../../interfaces/controllers/employee/EmpServiceController";
import { MongoReqServiceMechnics } from "../../interfaces/repositories/reqservicemechanics/mongoreqservicemechrep";
import { Accept_reqServiceEmployee } from "../../use-cases/employeeside/service_booking/put_acceptreqacceptEmployee";
import { ServicePaymentMongoRepositories } from "../../interfaces/repositories/payments/mongoservicePaymentRepositories";
import { Emp_getPaymentDetails } from "../../use-cases/employeeside/payment/getPaymentDetails";
import { EmployeeChatcontroller } from "../../interfaces/controllers/employee/employeechatcontroller";
import { Message_mongoRepositories } from "../../interfaces/repositories/chats/MongoChatsReposotories";
import { Get_chatbyEmployeeId } from "../../use-cases/chat/getchatbyEmployeeid";
import { User_getdetails } from "../../use-cases/userside/auth/getUserdetails.usCase";
import { UserMongodbRepositories } from "../../interfaces/repositories/userSide/UserMongoRepositories";
import { Emp_Forgot_PasswordotpUseCase } from "../../use-cases/employeeside/forgotpassword";
import { Emp_NewPassword } from "../../use-cases/employeeside/postnewpassword";
import { Emp_putonDutyuseCase } from "../../use-cases/employeeside/putonDutyuseCase";
import { Emp_putaddLocationuseCase } from "../../use-cases/employeeside/putaddlocation";
import { WalletMongoRepositories } from "../../interfaces/repositories/wallet/walletMongoepositories";
import { Transaction_getbyuserId } from "../../use-cases/transactions/getuaserid";
import { TransactionMongoRepositories } from "../../interfaces/repositories/transaction/transactionMongoRepositories";
import { Employee_putwithrdawamountuseCase } from "../../use-cases/employeeside/payment/putwithdrawamount";
import { Employee_getWalletDetails } from "../../use-cases/wallet/getbyemployeeId";

// repositories
const empRepositories = new EmployeeMongoRepositories();
const service_bookingRep = new Mongo_Service_Booking_Repositories();
const adminjobRepositoies = new Mongo_Job_admin_Repositories();
const reqServiceMechanicsRepositories = new MongoReqServiceMechnics();
const servce_paymentRepositories = new ServicePaymentMongoRepositories();
const chatrepositories = new Message_mongoRepositories();
const userRepositories = new UserMongodbRepositories();
const walletRepositories = new WalletMongoRepositories();
const transactionrepositories = new TransactionMongoRepositories();

// usecases
const createEmployee = new EmployeeSignup(empRepositories, walletRepositories);
const sendmailOtp = new EmployeeSendOtp(empRepositories);
const checkOtp = new CheckOtp();
const login = new Emp_Login_useCase(empRepositories);

const forgotUserCase = new Emp_Forgot_PasswordotpUseCase(empRepositories);
const newPassword = new Emp_NewPassword(empRepositories);

const putProfieEMployee = new Employee_put_Profile_useCase(empRepositories);
const putEmp_job = new Employee_put_job_useCase(empRepositories);
const getEmpl_Booking = new Employee_Service_Booking_useCase(
  service_bookingRep
);
const putEmpl_Service_booking_status = new Employee_put_Service_booking_useCase(
  service_bookingRep
);
const getEmployee = new Employee_get_details_useCase(empRepositories);
const getJobs = new Admin_get_jobs_useCase(adminjobRepositoies);
const putonDuty = new Emp_putonDutyuseCase(empRepositories);
const addlocation = new Emp_putaddLocationuseCase(empRepositories);

const getreqservice = new EmpgetReqservice_useCase(
  reqServiceMechanicsRepositories
);
const putreqservice = new Accept_reqServiceEmployee(
  reqServiceMechanicsRepositories
);
const getServicePayment = new Emp_getPaymentDetails(servce_paymentRepositories);

// chats
const getchatbyEmployeeside = new Get_chatbyEmployeeId(chatrepositories);
const getuserDetails = new User_getdetails(userRepositories);

// trasactions

const gettranasactionByemployee = new Transaction_getbyuserId(
  transactionrepositories
);

const putwithrdrawamount = new Employee_putwithrdawamountuseCase(
  walletRepositories,
  empRepositories,
  transactionrepositories
);

const getwalletEmployee = new Employee_getWalletDetails(walletRepositories);
export const employeeController = new EmployeeController(
  createEmployee,
  sendmailOtp,
  checkOtp,
  login,
  putProfieEMployee,
  putEmp_job,
  getEmpl_Booking,
  putEmpl_Service_booking_status,
  getEmployee,
  getJobs,
  getuserDetails,
  forgotUserCase,
  newPassword,
  putonDuty,
  addlocation
);

export const servicecontroller = new EmpServiceController(
  getreqservice,
  putreqservice,
  getServicePayment,
  gettranasactionByemployee,
  putwithrdrawamount,
  getwalletEmployee
);

export const chatcontroller = new EmployeeChatcontroller(getchatbyEmployeeside);