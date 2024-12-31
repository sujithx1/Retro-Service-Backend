
import express from "express"
import { UserMongodbRepositories } from "../../interfaces/repositories/userSide/UserMongoRepositories"
import { CreateUser } from "../../use-cases/userside/createUser"
import { Usercontroller } from "../../interfaces/controllers/userController"

const userRepositories=new UserMongodbRepositories()
const createUser=new CreateUser(userRepositories)




const userController=new Usercontroller(createUser)


const userRouter=express.Router()


userRouter.post('/signup',(req,res)=>userController.signUp(req,res))


export default userRouter
