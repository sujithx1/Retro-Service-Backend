import { MessageEntites } from "../../entities/chatEntities";
import { IMessageRepositories } from "../../interfaces/repositories/chats/IchatsRepositories";


export class Get_MessagesByuseId{
    constructor(private messageRespositories:IMessageRepositories) {}
    async execute(userId:string):Promise<MessageEntites[]>{
      const messages=this.messageRespositories.getMessagesByUser(userId);
        return messages;
    }
}