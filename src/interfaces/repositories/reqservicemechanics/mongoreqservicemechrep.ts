import { RequestserviceMechEntities } from "../../../entities/reqserviceEntities";
import { Request_Service_Mech_model } from "../../../frameworks/db/models/reqserviceMechanics";
import { IreqservicemechanicsRepositories } from "./Ireqservicesmechrepositories";

export class MongoReqServiceMechnics implements IreqservicemechanicsRepositories{
   async  create(services: RequestserviceMechEntities): Promise<RequestserviceMechEntities> {
         
     
        const req= await Request_Service_Mech_model.create(services)

        await req
        .populate([
          { path: 'userId', select: 'username email id' },
          { path: 'mechanics', select: 'name id' },
          { path: 'jobId', select: 'name description' }
        ]);
        const empllist = req.mechanics.map(emp => {
            if ('id' in emp) {
              return emp.id; 
            }
            return emp.toString(); 
          });
        return new RequestserviceMechEntities(
            req.id,
            req.userId._id.toString(),
            req.userName,
            req.userEmail,
            req.userLocation,
            req.jobId._id.toString(),
            req.jobName,
            req.minWage,
            req.problem,
             empllist,
            req.status,
            req.bookingDate,
          




        )
     }
     async findbyempId(empid: string): Promise<RequestserviceMechEntities[] | []> {
      const reqserviceEmpl = await Request_Service_Mech_model.find({
        mechanics: empid
      });
      
        console.log("reqservices",reqserviceEmpl);
        
      
        if (!reqserviceEmpl || reqserviceEmpl.length === 0) return [];
      
        // Populate each document individually
        for (let service of reqserviceEmpl) {
          await service.populate([
            { path: 'userId', select: 'username email _id' },
            { path: 'mechanics', select: 'name _id' },
            { path: 'jobId', select: 'name description _id' },
            { path: 'acceptEmployee.employeeId', select: 'name _id' }
          ]);
        }
      
        return reqserviceEmpl.map((service) => {
          const empllist = service.mechanics.map(emp => {
            if ('_id' in emp) {
              return emp._id.toString();
            }
            return emp.toString();
          });
      
          const acceptEmployee = service.acceptEmployee
            ? {
                employeeId: service.acceptEmployee.employeeId
                  ? service.acceptEmployee.employeeId.toString()
                  : null,
                acceptTime: service.acceptEmployee.acceptTime
              }
            : null;
      
          return new RequestserviceMechEntities(
            service._id.toString(),
            service.userId._id.toString(),
            service.userId.username,
            service.userId.email,
            service.userLocation,
            service.jobId._id.toString(),
            service.jobId.name,
            service.minWage,
            service.problem,
            empllist,
            service.status,
            service.bookingDate,
            acceptEmployee
          );
        });
      }
      async findbyId(id: string): Promise<RequestserviceMechEntities | null> {
       const reqservice=await Request_Service_Mech_model.findById(id)
       if(!reqservice) return null
        
       await reqservice
       .populate([
         { path: 'userId', select: 'username email id' },
         { path: 'mechanics', select: 'name id' },
         { path: 'jobId', select: 'name description' }
       ]);
       const empllist = reqservice.mechanics.map(emp => {
           if ('id' in emp) {
             return emp.id; 
           }
           return emp.toString(); 
         });

         const acceptEmployee = reqservice.acceptEmployee
         ? {
             employeeId: reqservice.acceptEmployee.employeeId
               ? reqservice.acceptEmployee.employeeId.toString()
               : null,
             acceptTime: reqservice.acceptEmployee.acceptTime
           }
         : null;
       return new RequestserviceMechEntities(
        reqservice.id,
        reqservice.userId._id.toString(),
        reqservice.userName,
        reqservice.userEmail,
        reqservice.userLocation,
        reqservice.jobId._id.toString(),
        reqservice.jobName,
        reqservice.minWage,
        reqservice.problem,
         empllist,
        reqservice.status,
        reqservice.bookingDate,
        acceptEmployee
        )
       
      }

      async findByIdAndUpdate(reqService: RequestserviceMechEntities,empId:string): Promise<RequestserviceMechEntities|null> {
          const service=await Request_Service_Mech_model.findByIdAndUpdate(reqService.id,{
            status:reqService.status,
            $set: {
              "acceptEmployee": {
                employeeId: empId,
                acceptTime: new Date() // Set acceptTime to current date and time
              }
            }
      
          },{
            new:true,upsert:true
          }
        )
        if(!service)return null

        await service
        .populate([
          { path: 'userId', select: 'username email id' },
          { path: 'mechanics', select: 'name id' },
          { path: 'jobId', select: 'name description' }
        ]);
        const empllist = service.mechanics.map(emp => {
            if ('id' in emp) {
              return emp.id; 
            }
            return emp.toString(); 
          });
 
          const acceptEmployee = service.acceptEmployee
          ? {
              employeeId: service.acceptEmployee.employeeId
                ? service.acceptEmployee.employeeId.toString()
                : null,
              acceptTime: service.acceptEmployee.acceptTime
            }
          : null;
        return new RequestserviceMechEntities(
         service.id,
         service.userId._id.toString(),
         service.userName,
         service.userEmail,
         service.userLocation,
         service.jobId._id.toString(),
         service.jobName,
         service.minWage,
         service.problem,
          empllist,
         service.status,
         service.bookingDate,
         acceptEmployee
         )
        
      }
      
}