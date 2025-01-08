import { NextFunction, Request, Response } from "express";



export class ServiceController{
    constructor() {}


    async reqserviceEmployee(req:Request,res:Response,next:NextFunction){
        try {
            const {}=req.body
            console.log(req.body);
            
            
        } catch (error) {
            
        }
    }
}