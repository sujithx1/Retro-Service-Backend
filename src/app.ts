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

import storeRouter from "./frameworks/routes/storeRoutes";
import "./utils/helper/db_helper/cronjobReject";
import { socket_Connection } from "./socket";
const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin:process.env.CLEINT_URL,
  // origin:'https://retro-service.vercel.app',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const io = new Server(server, {
  cors: corsOptions,
});
socket_Connection ();

app.use(cors(corsOptions)); 
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

connectdb(); 
app.use(morgan("dev"));


app.use("/api/user", userRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/store", storeRouter);
app.use(errorHandler as express.ErrorRequestHandler);
 

export default server;
