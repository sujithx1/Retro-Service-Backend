import { MessageEntites } from "../../entities/chatEntities";
import { IMessageRepositories } from "../../interfaces/repositories/chats/IchatsRepositories";


export class Get_chatbyEmployeeId{
    constructor(private chatrepositories:IMessageRepositories){}
    async execute(employeeId:string):Promise<MessageEntites[]|null>{

        const chats=await  this.chatrepositories.getMessagesByEmployee(employeeId);
        return chats;

        
    }
}