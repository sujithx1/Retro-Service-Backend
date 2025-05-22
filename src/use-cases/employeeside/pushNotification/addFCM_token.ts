import { IEmployeeRepositories } from "../../../interfaces/repositories/employeeside/IEmployeRepositories";


export class FCM_TOKEN_ADDuseCase {
    constructor(
        private employeeRepositories:IEmployeeRepositories
    ) {

        

        
    }



    async execute(id:string,token:string):Promise<void>{
        
      await this.employeeRepositories.findByIdAndUpdate_FCMToken(id,token);
      
    


    }
}