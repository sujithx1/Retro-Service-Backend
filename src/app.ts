import express from "express"
import { connectdb } from "./frameworks/db/connection"
import cors from "cors"
import userRouter from "./frameworks/routes/userRoutes"
  
const app=express()

app.use(express.json())
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
  app.use(cors(corsOptions));
  connectdb()

  app.use('/api/user',userRouter)
  




export default app