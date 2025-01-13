import express from "express"
import { connectdb } from "./frameworks/db/connection"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./frameworks/routes/userRoutes"
import adminRouter from "./frameworks/routes/adminRouters"
import employeeRouter from "./frameworks/routes/empRoutes"
import { errorHandler } from "./interfaces/middleware/Errorhadler"
import morgan from "morgan"
  
const app=express()
  
app.use(express.json({
  limit:"20mb"
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders:["Content-Type","Authorization"]
  };
  app.use(cors(corsOptions));
  connectdb()
  app.use(morgan('dev'))
  app.use('/api/user',userRouter)
  app.use('/api/employee',employeeRouter)
  app.use('/api/admin',adminRouter)
  app.use(errorHandler as express.ErrorRequestHandler);



export default app