import express from "express"
import { StoreController } from "../../interfaces/controllers/store/storeController";
import { SendOtp } from "../../use-cases/store/sendotp";
import { StoreMongoRepositories } from "../../interfaces/repositories/store/storeMongorepositories";


const storeRepositories=new StoreMongoRepositories()
 const sendOtp=new SendOtp(storeRepositories)

const storeController=new StoreController(sendOtp)




const router=express.Router()

router.post('/register',(req,res,next)=>{
    storeController.signUp(req,res,next)
})
// front endil check store owner  is valid otp send 