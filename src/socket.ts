 
 import { io } from "./app";
import { ActiveConnection } from "./frameworks/db/models/ActivateModel";
 import {  MessageModel } from "./frameworks/db/models/messageModel";

 const activeUsers = new Map<string, string>(); // userId -> socketId



 export const socket_Connection=()=>{

     
     io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);
  console.log(`Total connections: ${io.engine.clientsCount}`);


  socket.on("register", async (userType: string, userId: string) => {
    console.log(`User registered: ${userType}, ID: ${userId}, Socket: ${socket.id}`);

    activeUsers.set(userId, socket.id); 
 
    try { 
      await ActiveConnection.findOneAndUpdate(
          { userType, userId },
        { socketId: socket.id },
        { upsert: true }
      );
    } catch (error) {
      console.error("Error registering user:", error);
    }
  });

  socket.on("markAsRead", async ({ sender, receiver }) => {
    console.log("✅ Marking messages as read...");
  
    try {
      await MessageModel.updateMany({ sender, receiver }, { $set: { isRead: true } });
  
      const senderSocketId = activeUsers.get(sender);
      if (senderSocketId) {
        io.to(senderSocketId).emit("messagesRead", { sender });
        console.log(`📢 Sent 'messagesRead' event to sender: ${senderSocketId}`);
      }
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  });
  
  
 
  socket.on("callData",({ senderId, receiverId,  callType })=>{
    console.log(senderId,receiverId,callType);
    const usersideId=activeUsers.get(senderId);
    console.log("userSocket ID",usersideId);
    console.log("Active users:", [...activeUsers.entries()]);
    console.log("All rooms:", io.sockets.adapter.rooms);
    
    
    if (usersideId) {
      io.to(usersideId).emit("callDetails",{senderId,receiverId,callType});
      console.log("sended call data",usersideId);
      
      
    }
    
    
    
});
  socket.on("call", ({ senderId,senderName, receiverId, roomId, callType ,senderProfilePic}) => {
    console.log("📞 Incoming Call Request:", { senderId,senderName, receiverId, callType });
socket.join(roomId);
    const receiverSocketId = activeUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("callIncoming", { callType, senderId, roomId,senderName ,senderProfilePic});
      console.log("📢 Call Incoming event emitted");
    }
  });

  
  socket.on("acceptCall", ({ roomId, employeeId }) => {
    console.log(`✅ Call Accepted in room: ${roomId}, Employee ID: ${employeeId}`);

    socket.join(roomId); 
    console.log(`🔗 User joined room: ${roomId}`);

    setTimeout(() => {  
      console.log(`📢 Emitting "callAccepted" to room: ${roomId}`);
      io.to(roomId).emit("callAccepted", { roomId, employeeId });
    }, 100); 
  });
socket.on("rejectCall",({roomId,senderId})=>{
  console.log(senderId,roomId);
  io.to(roomId).emit("rejected",{roomId,senderId});
  
});


  socket.on(
    "sendMessage",
    async ({ sender, receiver, message, userType, timestamp, status ,attachment }) => {
      console.log(`Message from ${sender} to ${receiver}: ${message}`);
      console.log(sender,
        receiver,
        message,
        userType,

        timestamp,
        status,
        attachment

      );
      
      
      try {
          const recipient = await ActiveConnection.findOne({ userType, userId: receiver});
        console.log(recipient);
        
        await new MessageModel({ sender, receiver, message, userType,  attachment: attachment ? {
          type: attachment.type,
          url: attachment.url,
          name: attachment.name,
          size: attachment.size
        } : undefined
       }).save();

        if (recipient) {
          io.to(recipient.socketId).emit("chatMessage", { sender, message, timestamp, status ,attachment, // Sending attachment data
          });
          console.log(`Message sent to ${receiver} (Socket: ${recipient.socketId})`);
          
        } else {
            console.log(`User ${receiver} is offline.`);
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
}
);

socket.on("newBooking", (booking) => {
    console.log("New Booking Request:", booking);
    io.emit("bookingNotification", booking);
});

  socket.on("disconnect", async () => {
    const userId = [...activeUsers.entries()].find(([_, sid]) => sid === socket.id)?.[0];
    if (userId) {
      activeUsers.delete(userId);
      console.log(`User ${userId} removed.`);
    }
      });
});

};