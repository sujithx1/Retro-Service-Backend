
import dotenv  from "dotenv";
dotenv.config();
import server from "./app";

const port=process.env.PORT; 
// console.log("ENV VARIABLES in server.ts:", process.env);
// console.log("JWT Secret in Middleware:", process.env.ACCESS_TOKEN);
// console.log("sujith");


server.listen(port,()=>console.log(`server running ${port}`)
);     