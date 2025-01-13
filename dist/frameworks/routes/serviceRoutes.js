"use strict";
// import express from "express"
// import { ServiceController } from "../../interfaces/controllers/user/UserserviceController"
// import { ReqEmployeeServices_useCase } from "../../use-cases/userside/service/req.employeeservice"
// import { EmpgetReqservice_useCase } from "../../use-cases/userside/service/getreqservicewithemployeeid.usecase"
// import { MongoReqServiceMechnics } from "../../interfaces/repositories/reqservicemechanics/mongoreqservicemechrep"
// import { UserMongodbRepositories } from "../../interfaces/repositories/userSide/UserMongoRepositories"
// import { EmployeeMongoRepositories } from "../../interfaces/repositories/employeeside/EmployeMongoRepositories"
// import { Authentication } from "../../interfaces/middleware/userside/userAuthentication"
// const user='/api/user'
// const employee='/api/employee'
// const admin='/api/admin'
// const router=express.Router()
// const reqServiceMechanicsRepositories=new MongoReqServiceMechnics()
// const userRepositories = new UserMongodbRepositories();
// const employeeRepositories = new EmployeeMongoRepositories();
// const createreqservicemechanics=new ReqEmployeeServices_useCase(
//   userRepositories,
//   employeeRepositories,
//   reqServiceMechanicsRepositories
// )
// const getreqservice=new EmpgetReqservice_useCase(reqServiceMechanicsRepositories)
// const serviceController=new ServiceController(createreqservicemechanics,getreqservice)
//     router.post(`${user}/req-services`,
//         Authentication,
//         (req,res,next)=>{
//         serviceController.reqserviceEmployee(req,res,next)
//     })
