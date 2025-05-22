import { ServiceEntities } from "../../../entities/ServiceEntities";
import { IEmployee_types } from "../../../frameworks/db/models/EmployeeModel";
import { IJobTypes } from "../../../frameworks/db/models/JobsModal";
import { Service_BookingModel } from "../../../frameworks/db/models/ServiceBooking";
import { IuserTypes } from "../../../frameworks/db/models/UserModel";
import { Iservice_bookingRepositories } from "./serviceBooking";


export class Mongo_Service_Booking_Repositories implements Iservice_bookingRepositories{
        async findbyId(id: string): Promise<ServiceEntities | null> {
            const service=await Service_BookingModel.findById(id)
            .populate({ path: "user", select: "username email" }) 
            .populate({ path: "employee", select: "location role" }) 
            .populate({ path: "job", select: "title description" }); 

            if(!service) return null;
            return new ServiceEntities(
                service.id,
                service.user.id.toString(),
                service.employee.id.toString(),
                service.job.id.toString(),
                service.userLocation,
                service.status,
                service.bookingDate,
                service.service_minWage,
                service.problem

            );
         
    }

    async create(service: ServiceEntities): Promise<ServiceEntities> {
        const services=await Service_BookingModel.create({
            user:service.userId,
            employee:service.employeeId,
            job:service.jobId,
            userLocation:service.userLocation,
            bookingDate:service.bookingDate,
            service_minWage:service.service_Minwage,
            problem:service.problem



        });
        await services.populate({ path: "user", select: "username email" }); 
       await services.populate({ path: "employee", select: "name role" }); 
       await services.populate({ path: "job", select: "name description" }); 

        return new ServiceEntities(
            services.id,
            services.user.id.toString(),
            services.employee.id.toString(),
            services.job.id.toString(),
            services.userLocation,
            services.status,
            services.bookingDate,
            services.service_minWage,
            services.problem,
            services.user.username,
            services.employee.username,
            services.job.name,
            services.user.profilePic,
            services.employee.location?.address.suburb,
            services.user.phone,


        );
        


    }
    async findByEmployee(empid: string): Promise<ServiceEntities[] | null> {


        const services = await Service_BookingModel.find({ employee: empid })
        .populate<{ user: IuserTypes }>({ path: "user" })
        .populate<{ employee: IEmployee_types }>({ path: "employee"})
        .populate<{ job: IJobTypes }>({ path: "job" });
      
    
        return services.map((service)=>new ServiceEntities(
            service.id,
            service.user.id,
            service.employee.id,
            service.job.id,
            service.userLocation,
            service.status,
            service.bookingDate,
            service.service_minWage,
            service.problem,
            service.user.username,
            service.employee.username,
            service.job.name,
            service.user.profilePic,
            service.employee.location?.address.suburb,
             
            service.user.phone,



        ));
        
    }
    async findbyIdAndUpdate(service: ServiceEntities): Promise<ServiceEntities | null> {
        
        const update=await Service_BookingModel.findByIdAndUpdate(service.id,{...service},{new:true})
        .populate<{ user: IuserTypes }>({ path: "user" })
        .populate<{ employee: IEmployee_types }>({ path: "employee"})
        .populate<{ job: IJobTypes }>({ path: "job" });
        if(!update) return null;

        return new ServiceEntities(
            update.id,
            update.user.id,
            update.employee.id,
            update.job.id,
            update.userLocation,
            update.status,
            update.bookingDate,
            update.service_minWage,
            update.problem,
            update.user.username,
            update.employee.username,
            update.job.name,
            update.employee.location?.address.suburb,

            update.user.phone,


        );
    }
}