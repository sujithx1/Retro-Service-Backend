import { MessageEntites } from "../../../entities/chatEntities";
import { MessageModel } from "../../../frameworks/db/models/messageModel";
import { IMessageRepositories } from "./IchatsRepositories";

export class Message_mongoRepositories implements IMessageRepositories{


async findById(id: string): Promise<MessageEntites|null> {
    
   const chat=await MessageModel.findById(id)
   if(!chat) return  null
   return new MessageEntites(
    chat.id,
    chat.sender,
    chat.receiver,
    chat.message,
    chat.userType,
    chat.timestamp,
    chat.isRead,
    chat.attachment
   )
    
    
}   
async getMessages(sender: string, receiver: string): Promise<MessageEntites[]> {

    const messages=await MessageModel.find({ sender, receiver }).sort({ timestamp: 1 });
    return  messages.map((item)=>new MessageEntites(
        item.id,
        item.sender,
        item.receiver,
        item.message,
        item.userType,
        item.timestamp,
        item.isRead,
        item.attachment
        
    ))
    
} 
async markMessagesAsRead(sender: string, receiver: string): Promise<void> {
    await MessageModel.updateMany({ sender, receiver, isRead: false }, { isRead: true });

    
}
async getMessagesByUser(userId: string): Promise<MessageEntites[]> {

    
    const messages = await MessageModel.find({
        $or: [
            { sender: userId },
            { receiver: userId }
        ]
    });

    return  messages.map((item)=>new MessageEntites(
        item.id,
        item.sender.toString(),
        item.receiver.toString(),
        item.message,
        item.userType,
        item.timestamp,
        item.isRead,
        item.attachment
        
    ))
}
async getMessagesByEmployee(employeeId: string): Promise<MessageEntites[]> {

    
    const messages = await MessageModel.find({
        $or: [
            { sender: employeeId },
            { receiver: employeeId }
        ]
    });

    return  messages.map((item)=>new MessageEntites(
        item.id,
        item.sender,
        item.receiver,
        item.message,
        item.userType,
        item.timestamp,
        item.isRead,
        item.attachment
        
    ))
}

}