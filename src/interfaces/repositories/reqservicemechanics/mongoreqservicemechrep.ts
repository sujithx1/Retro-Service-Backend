import { ReqService_MechanicTypes, RequestserviceMechEntities } from "../../../entities/reqserviceEntities";
import { Request_Service_Mech_model } from "../../../frameworks/db/models/reqserviceMechanics";
import { IreqservicemechanicsRepositories } from "./Ireqservicesmechrepositories";

export class MongoReqServiceMechnics implements IreqservicemechanicsRepositories{
   async  create(services: RequestserviceMechEntities): Promise<RequestserviceMechEntities> {
         
     
        const req= await Request_Service_Mech_model.create(services)

        await req
        .populate([
          { path: 'userId', select: 'username email id' },
          { path: 'mechanics', select: 'username id' },
          { path: 'jobId', select: 'name description' }
        ]);

       
        
      
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
            req.mechanics,
            req.status,
            req.bookingDate,
        




        )
     }
     async findbyempId(empid: string): Promise<RequestserviceMechEntities[] | []> {
      const reqserviceEmpl = await Request_Service_Mech_model.find({
        'mechanics.employeeId': empid
      });
      
       
        
      
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
          
              // If employeeId is populated (object), return its id
              if (typeof emp.employeeId === "object" && "_id" in emp.employeeId) {
                return {
                  employeeId: emp.employeeId._id.toString(),
                  bookingDate: emp.bookingDate
                };
              }
              // If employeeId is a string (ObjectId), return as it is
              return {
                employeeId: emp.employeeId,
                bookingDate: emp.bookingDate
              };
                      });
          
         
      
                      const acceptEmployee = service.acceptEmployee && service.acceptEmployee.employeeId?._id
                      ? {
                          employeeId: service.acceptEmployee.employeeId._id.toString(), // ✅ Extract only _id as string
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
            acceptEmployee,

            service.paymentId?service.paymentId:"",
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
     
       const acceptEmployee = reqservice.acceptEmployee && reqservice.acceptEmployee.employeeId?._id
       ? {
           employeeId: reqservice.acceptEmployee.employeeId._id.toString(), // ✅ Extract only _id as string
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
         reqservice.mechanics,
        reqservice.status,
        reqservice.bookingDate,
        acceptEmployee,
        reqservice.paymentId?reqservice.paymentId:"",

        )
       
      }

      async findByIdAndUpdate(reqService: RequestserviceMechEntities,empId:string): Promise<RequestserviceMechEntities|null> {
        const updateData: any = {
          status: reqService.status,
        
          acceptEmployee: {
            employeeId: empId,
            acceptTime: new Date() 
          }
        };
      
        if (reqService.paymentId && reqService.paymentId!=="") {
          updateData.paymentId = reqService.paymentId;
        }
        const service = await Request_Service_Mech_model.findByIdAndUpdate(
          reqService.id,
          updateData,
          {
            new: true,
            upsert: true
          }
        );

        if(!service) return null
        
        await service
        .populate([
          { path: 'userId', select: 'username email id' },
          { path: 'mechanics', select: 'name id' },
          { path: 'jobId', select: 'name description' }
        ]);
       
 
        const acceptEmployee = service.acceptEmployee && service.acceptEmployee.employeeId?._id
  ? {
      employeeId: service.acceptEmployee.employeeId._id.toString(), // ✅ Extract only _id as string
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
          service.mechanics,
         service.status,
         service.bookingDate,
         acceptEmployee,
         service.paymentId?service.paymentId:"",
         )

        
      }
      async findByIdAndUpdateCancellBooking(reqService: RequestserviceMechEntities): Promise<RequestserviceMechEntities | null> {

        const service = await Request_Service_Mech_model.findByIdAndUpdate(
reqService.id,
{
  status:reqService.status
}
,{new:true}
        )

        if(!service) return null
        await service
        .populate([
          { path: 'userId', select: 'username email id' },
          { path: 'mechanics', select: 'name id' },
          { path: 'jobId', select: 'name description' }
        ]);
        
        const acceptEmployee = service.acceptEmployee && service.acceptEmployee.employeeId?._id
        ? {
            employeeId: service.acceptEmployee.employeeId._id.toString(), // ✅ Extract only _id as string
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
          service.mechanics,
         service.status,
         service.bookingDate,
         acceptEmployee,
         service.paymentId?service.paymentId:"",
         )}


       async findbyUserId(userId: string): Promise<RequestserviceMechEntities[] | []> {

          const reqservice = await Request_Service_Mech_model.find({
            userId: userId
          });
          
            
          
            if (!reqservice || reqservice.length === 0) return [];
          
            // Populate each document individually
            for (let service of reqservice) {
              await service.populate([
                { path: 'userId', select: 'username email _id' },
                { path: 'mechanics', select: 'name _id' },
                { path: 'jobId', select: 'name description _id' },
                { path: 'acceptEmployee.employeeId', select: 'name _id' }
              ]);
            }
          
            return reqservice.map((service) => {
              const empllist = service.mechanics.map((emp) => {
                // Type guard to check if employeeId is of type IEmployee_types (object)
                if (emp.employeeId && typeof emp.employeeId !== "string") {
                  return {
                    employeeId: emp.employeeId._id.toString(),  // Access _id when it's an object
                    bookingDate: emp.bookingDate,  // The bookingDate field
                  };
                }
              
                // If it's a string, handle accordingly (it could be an ObjectId)
                return {
                  employeeId: emp.employeeId,  // Convert ObjectId to string
                  bookingDate: emp.bookingDate,
                };
              });
              
              const acceptEmployee = service.acceptEmployee && service.acceptEmployee.employeeId?._id
              ? {
                  employeeId: service.acceptEmployee.employeeId._id.toString(), // ✅ Extract only _id as string
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
                acceptEmployee,
    
                service.paymentId?service.paymentId:"",
              );
            });
            
        }


        async findByIdAndUpdateService(service: RequestserviceMechEntities): Promise<RequestserviceMechEntities | null> {
          try {
            const updatedService = await Request_Service_Mech_model.findByIdAndUpdate(
              service.id, 
              {
                $set: { status: service.status, mechanics: service.mechanics,bookingDate:service.bookingDate }, // Updating fields
              },
              { new: true } 
           

            )
        if(!updatedService) return null
        await updatedService
        .populate([
          { path: 'userId', select: 'username email id' },
          { path: 'mechanics', select: 'name id' },
          { path: 'jobId', select: 'name description' }
        ]);
        
 
          const acceptEmployee = updatedService.acceptEmployee
          ? {
              employeeId: updatedService.acceptEmployee.employeeId
                ? updatedService.acceptEmployee.employeeId.toString()
                : null,
              acceptTime: updatedService.acceptEmployee.acceptTime
            }
          : null;


        return new RequestserviceMechEntities(
         updatedService.id,
         updatedService.userId._id.toString(),
         updatedService.userName,
         updatedService.userEmail,
         updatedService.userLocation,
         updatedService.jobId._id.toString(),
         updatedService.jobName,
         updatedService.minWage,
         updatedService.problem,
          updatedService.mechanics,
         updatedService.status,
         updatedService.bookingDate,
         acceptEmployee,
         updatedService.paymentId?service.paymentId:"",
         )
          } catch (error) {
            console.error("Error updating service:", error);
            throw new Error("Failed to update service");
          }
        }
        

}