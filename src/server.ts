
import dotenv  from "dotenv"
dotenv.config()
import server from "./app";

const port=process.env.PORT 

server.listen(port,()=>console.log(`server running ${port}`)
)     