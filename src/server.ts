
import dotenv  from "dotenv"
dotenv.config()
import app from "./app";

const port=process.env.port 

app.listen(port,()=>console.log(`server running ${port}`)
)     