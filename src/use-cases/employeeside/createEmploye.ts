import { MechanicResponesDto } from "../../DTO/dto";
import { MechanicMap } from "../../DTO/map/mechanic.map";
import { EmployeeEntities } from "../../entities/EmployeeEntities";
import { WalletEntities } from "../../entities/walletEntities";
import { IEmployeeRepositories } from "../../interfaces/repositories/employeeside/IEmployeRepositories";
import { IwalletRepositories } from "../../interfaces/repositories/wallet/Iwalletrepositories";
import { hashpass } from "../../utils/hashPassword";




export  class EmployeeSignup{
    constructor(private employeRepositories:IEmployeeRepositories,
        private walletrepositories:IwalletRepositories

    ) {}
    async execute(data:{username:string,email:string,phone:string,password:string,skills:string[],experience:number,proof:string}):Promise<MechanicResponesDto>{

        const {username,email,phone,password,skills,experience,proof}=data;
        const hashPassword=await hashpass(password);
        const employee=new EmployeeEntities(
            "",
            username,
            email,
            phone,
            hashPassword,
            skills,
            experience,
            false,
            proof

            
        );
        const newEmployee=await this.employeRepositories.save(employee);
        const wallet=new WalletEntities(
            "",
            newEmployee.id,
            "employee",
            0,
        );
    this.walletrepositories.create(wallet);
        return MechanicMap.toResponse(newEmployee);

    }
}