import { MessageEntites } from "../../../entities/chatEntities";


export interface IMessageRepositories{
    findById(id:string):Promise<MessageEntites|null>
    getMessages(sender:string,receiver:string):Promise<MessageEntites[]>
    markMessagesAsRead(sender:string,receiver:string):Promise<void>
    // getMessagesByUser(userId:string):Promise<MessageEntites[]>
    getMessagesByEmployee(employeeId:string):Promise<MessageEntites[]>
    
}