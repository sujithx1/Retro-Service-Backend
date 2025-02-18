import express from "express";
import { connectdb } from "./frameworks/db/connection";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./frameworks/routes/userRoutes";
import adminRouter from "./frameworks/routes/adminRouters";
import employeeRouter from "./frameworks/routes/empRoutes";
import { errorHandler } from "./interfaces/middleware/Errorhadler";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { ActiveConnection } from "./frameworks/db/models/ActivateModel";
import {  MessageModel } from "./frameworks/db/models/messageModel";
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
app.use(errorHandler as express.ErrorRequestHandler);

// Store the socket connections by user/employee IDs
  let activeConnections: { [key: string]: string } = {};
// When a user or employee connects
io.on("connection", (socket) => {
  console.log("A user/employee connected");

 

  socket.on("register", async (userType: string, userId: string) => {
    console.log("message types connection",userType,userId);
    
    try {
      // Save or update active connection in the database

      await ActiveConnection.findOneAndUpdate(
        { userType, userId },
        { socketId: socket.id },
        { upsert: true }
      );


      console.log(`User/Employee ${userId} registered as ${userType}`);
    } catch (error) {
      console.error("Error registering user/employee:", error);
    }
  });



  socket.on(
    "sendMessage",
    async ({
      sender,
      receiver,
      message,
      userType,
      timestamp,
      status
    }: {
      sender: string;
      receiver: string;
      message: string;
      userType:"user"|"employee",
      timestamp:string,
      status: "seen" | "delivered";
    }) => {
      console.log("message connnectin ",`
        from = ${sender},
        reciver  = ${receiver}  ,
        message = ${message}  , 
        usertype: ${userType} . 
        timestamp ${timestamp}`);
      
      try {
        // Fetch the recipient's socket ID from the database
        const recipient = await ActiveConnection.findOne({
          userType: userType,
          userId: receiver,
        });

        // Save the message in the database
        await new MessageModel(
          {  sender, receiver, message,userType})
          .save();
 
        // await MessageModel.create({sender:sender,receiver:receiver,message:message,userType:userType})

        if (recipient) {
          
          // Send the message to the recipient if they're online
          io.to(recipient.socketId).emit("chatMessage", {
            sender: sender,
            message,
            timestamp,
            status
          });

          console.log("online","user id",sender,"empId",receiver,"message",message );
          
        } else {
          console.log("offline","user id",sender,"empId",receiver,"message",message );
          console.log(`Employee ${receiver} is not online.`);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      } 
    }
  );

  
  socket.on("newBooking", (booking) => {
    console.log("New Booking Request:", booking);
    io.emit("bookingNotification", booking); // Notify all clients
  });

 


  socket.on("disconnect", async () => {
    try {
      // Remove disconnected socket from active connections in the database
      await ActiveConnection.deleteOne({ socketId: socket.id });
      console.log(`Socket ${socket.id} disconnected`);
    } catch (error) {
      console.error("Error during disconnection:", error);
    }
  });
  });

// Start the server
export {io}

export default server;
