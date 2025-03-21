import express from "express";
import { connectdb } from "./frameworks/db/connection";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./frameworks/routes/userRoutes";
import adminRouter from "./frameworks/routes/adminRouters";
import employeeRouter from "./frameworks/routes/mechRoutes";
import { errorHandler } from "./interfaces/middleware/Errorhadler";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { ActiveConnection } from "./frameworks/db/models/ActivateModel";
import {  MessageModel } from "./frameworks/db/models/messageModel";
import storeRouter from "./frameworks/routes/storeRoutes"
import "./utils/helper/db_helper/cronjobReject"
const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions)); // Ensure CORS is enabled for API routes
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

connectdb(); // Ensure database connection
app.use(morgan("dev"));


app.use("/api/user", userRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/store", storeRouter);
app.use(errorHandler as express.ErrorRequestHandler);
  const activeUsers = new Map<string, string>(); // userId -> socketId
  const roomPeers: Record<string, { offerReceived: boolean }> = {};
  const roomAnswer: Record<string, {  answerSent:boolean}> = {};


io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);
  console.log(`Total connections: ${io.engine.clientsCount}`);


  // 🔹 Register user with socket ID
  socket.on("register", async (userType: string, userId: string) => {
    console.log(`User registered: ${userType}, ID: ${userId}, Socket: ${socket.id}`);

    // Store in activeUsers map
    activeUsers.set(userId, socket.id); 
 
    try { 
      // Store in database
      await ActiveConnection.findOneAndUpdate(
        { userType, userId },
        { socketId: socket.id },
        { upsert: true }
      );
    } catch (error) {
      console.error("Error registering user:", error);
    }
  });

 
 // Handle call initiation
 
  // Handle Call Request
  socket.on('callData',({ senderId, receiverId,  callType })=>{
    console.log(senderId,receiverId,callType);
    const usersideId=activeUsers.get(senderId)
    console.log("userSocket ID",usersideId);
    console.log("Active users:", [...activeUsers.entries()]);
    console.log("All rooms:", io.sockets.adapter.rooms);
    
    
    if (usersideId) {
      io.to(usersideId).emit('callDetails',{senderId,receiverId,callType})
      console.log("sended call data",usersideId);
      
      
    }

    
    
  })
  socket.on("call", ({ senderId,senderName, receiverId, roomId, callType }) => {
    console.log("📞 Incoming Call Request:", { senderId,senderName, receiverId, callType });
socket.join(roomId)
    const receiverSocketId = activeUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("callIncoming", { callType, senderId, roomId,senderName });
      console.log("📢 Call Incoming event emitted");
    }
  });

  // Handle Call Acceptance
  socket.on("acceptCall", ({ roomId, employeeId }) => {
    console.log(`✅ Call Accepted in room: ${roomId}, Employee ID: ${employeeId}`);

    socket.join(roomId); // Ensure user joins the room
    console.log(`🔗 User joined room: ${roomId}`);

    setTimeout(() => {  
      console.log(`📢 Emitting "callAccepted" to room: ${roomId}`);
      io.to(roomId).emit("callAccepted", { roomId, employeeId });
    }, 100); // Small delay to ensure room join
  });
socket.on('rejectCall',({roomId,senderId})=>{
  console.log(senderId,roomId);
  io.to(roomId).emit('rejected',{roomId,senderId})
  
})


  // 🔹 Handle Messages (Fixed)
  socket.on(
    "sendMessage",
    async ({ sender, receiver, message, userType, timestamp, status }) => {
      console.log(`Message from ${sender} to ${receiver}: ${message}`);

      try {
        // Get recipient socket from DB
        const recipient = await ActiveConnection.findOne({ userType, userId: receiver });

        // Save message in DB
        await new MessageModel({ sender, receiver, message, userType }).save();

        if (recipient) {
          io.to(recipient.socketId).emit("chatMessage", { sender, message, timestamp, status });
          console.log(`Message sent to ${receiver} (Socket: ${recipient.socketId})`);
        } else {
          console.log(`User ${receiver} is offline.`);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  );

  // 🔹 New Booking Notification
  socket.on("newBooking", (booking) => {
    console.log("New Booking Request:", booking);
    io.emit("bookingNotification", booking);
  });

  // 🔹 Handle disconnection (Fixed)
  socket.on("disconnect", async (reason) => {
    const userId = [...activeUsers.entries()].find(([_, sid]) => sid === socket.id)?.[0];
    if (userId) {
      activeUsers.delete(userId);
      console.log(`User ${userId} removed.`);
    }
      });
});

// Start the server
export {io}

export default server;
