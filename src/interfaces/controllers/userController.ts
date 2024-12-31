import {Request,Response} from "express"
import { CreateUser } from "../../use-cases/userside/createUser"


export class Usercontroller{
    constructor(private createUser:CreateUser) { }

     async signUp(req:Request,res:Response){
        try {
            // const {userData}=req.body
            const {username,email,phone,password}=req.body
            const userData={username,email,phone,password}


            const user=await this.createUser.exicute(userData)
            const {password:_,...withoutPassword}=user
            res.status(201).json({message:"user Registred",user:withoutPassword})



            
        } catch (error:any) {

            res.status(400).json({error:error.message})
            
        }

    }


}