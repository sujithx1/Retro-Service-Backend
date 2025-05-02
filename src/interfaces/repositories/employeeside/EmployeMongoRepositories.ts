import { EmployeeEntities } from "../../../entities/EmployeeEntities";
import { EmployeeModel } from "../../../frameworks/db/models/EmployeeModel";
import { Locationuser_types } from "../../../types/user";
import { IEmployeeRepositories } from "./IEmployeRepositories";

export class EmployeeMongoRepositories implements IEmployeeRepositories {
  async findByEmail(email: string): Promise<EmployeeEntities | null> {
    const employee = await EmployeeModel.findOne({ email: email });
    if (!employee) return null;
    return new EmployeeEntities(
      employee.id,
      employee.username,
      employee.email,
      employee.phone,
      employee.password,
      employee.skills,
      employee.experience,
      employee.isValidated,
      employee.proof,
      employee.isActive,
      employee.profilePic,
      employee.location,
      employee.authSource,
      employee.role,
      employee.revenue,
      employee.onDuty,
      employee.FCM_Token,
      employee.createdAt,
      employee.updatedAt
    );
  }
  async save(employee: EmployeeEntities): Promise<EmployeeEntities> {
    const newEmploye = await EmployeeModel.create(employee);
    return new EmployeeEntities(
      newEmploye.id,
      newEmploye.username,
      newEmploye.email,
      newEmploye.phone,
      newEmploye.password,
      newEmploye.skills,
      newEmploye.experience,
      false
    );
  }
  async findById(id: string): Promise<EmployeeEntities | null> {
    const employee = await EmployeeModel.findById(id);
    if (!employee) return null;
    return new EmployeeEntities(
      employee.id,
      employee.username,
      employee.email,
      employee.phone,
      employee.password,
      employee.skills,
      employee.experience,
      employee.isValidated,
      employee.proof,
      employee.isActive,
      employee.profilePic,
      employee.location,
      employee.authSource,
      employee.role,
      employee.revenue,
      employee.onDuty,
      employee.FCM_Token,
      employee.createdAt,
      employee.updatedAt
    );
  }

  async findByIdAndUpdate(
    emmployee: EmployeeEntities
  ): Promise<EmployeeEntities | null> {
    const employee = await EmployeeModel.findByIdAndUpdate(
      emmployee.id,
      {
        username: emmployee.username,
        phone: emmployee.phone,
        profilePic: emmployee.profilePic,
        skills: emmployee.skills,
        experience: emmployee.experience,
        location: emmployee.location,
      },
      { new: true }
    );
    if (!employee) return null;

    return new EmployeeEntities(
      employee.id,
      employee.username,
      employee.email,
      employee.phone,
      employee.password,
      employee.skills,
      employee.experience,
      employee.isValidated,
      employee.proof,
      employee.isActive,
      employee.profilePic,
      employee.location,
      employee.authSource,
      employee.role,
      employee.revenue,
      employee.onDuty,
      employee.FCM_Token,
      employee.createdAt,
      employee.updatedAt
    );
  }

  async findAll(): Promise<EmployeeEntities[]> {
    const employees = await EmployeeModel.find();
    return employees.length
      ? employees.map(
          (item) =>
            new EmployeeEntities(
              item.id,
              item.username,
              item.email,
              item.phone,
              item.password,
              item.skills,
              item.experience,
              item.isValidated,
              item.proof,
              item.isActive,
              item.profilePic,
              item.location,
              item.authSource,
              item.role,
              item.revenue,
              item.onDuty,
              item.FCM_Token,
              item.createdAt,
              item.updatedAt
            )
        )
      : [];
  }
  async findIdAndUpdateRevenue(
    id: string,
    revenue: number
  ): Promise<EmployeeEntities | null> {
    const employee = await EmployeeModel.findByIdAndUpdate(
      id,
      { $inc: { revenue: revenue } }, // Increment the revenue field
      { new: true } // Return the updated document
    );

    if (!employee) return null;

    return new EmployeeEntities(
      employee.id,
      employee.username,
      employee.email,
      employee.phone,
      employee.password,
      employee.skills,
      employee.experience,
      employee.isValidated,
      employee.proof,
      employee.isActive,
      employee.profilePic,
      employee.location,
      employee.authSource,
      employee.role,
      employee.revenue,
      employee.onDuty,
      employee.FCM_Token,
      employee.createdAt,
      employee.updatedAt
    );
  }

  async findByIdAndUpdatePassword(
    id: string,
    password: string
  ): Promise<void | null> {
    const employee = await EmployeeModel.findByIdAndUpdate(
      id,
      { password: password },
      { new: true }
    );
    if (!employee) return null;
  }

  async findByIdAndonDutyupdate(
    id: string,
    duty: boolean
  ): Promise<EmployeeEntities | null> {
    const employee = await EmployeeModel.findByIdAndUpdate(
      id,
      {
        onDuty: duty,
      },
      { new: true }
    );

    if (!employee) return null;

    return new EmployeeEntities(
      employee.id,
      employee.username,
      employee.email,
      employee.phone,
      employee.password,
      employee.skills,
      employee.experience,
      employee.isValidated,
      employee.proof,
      employee.isActive,
      employee.profilePic,
      employee.location,
      employee.authSource,
      employee.role,
      employee.revenue,
      employee.onDuty,
      employee.FCM_Token,
      employee.createdAt,
      employee.updatedAt
    );
  }
  async findByIdAndUpdatelocation(
    id: string,
    location: Locationuser_types
  ): Promise<EmployeeEntities | null> {
    const employee = await EmployeeModel.findByIdAndUpdate(
      id,
      {
        location: location,
      },
      { new: true, upsert: true }
    );

    if (!employee) return null;

    return new EmployeeEntities(
      employee.id,
      employee.username,
      employee.email,
      employee.phone,
      employee.password,
      employee.skills,
      employee.experience,
      employee.isValidated,
      employee.proof,
      employee.isActive,
      employee.profilePic,
      employee.location,
      employee.authSource,
      employee.role,
      employee.revenue,
      employee.onDuty,
      employee.FCM_Token,
      employee.createdAt,
      employee.updatedAt
    );
  }

  async calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): Promise<number> {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  async findempnearestWithOnduty(userLocation: {
    lat: number;
    lng: number;
  }): Promise<EmployeeEntities[]> {
    try {
      // Find employees who are on duty and have a location
      const employees = await EmployeeModel.find({
        onDuty: true,
        "location.lat": { $exists: true },
        "location.lng": { $exists: true },
      });

      // Map employees to include calculated distances and filter by 5 km radius
      const employeesWithDistances = await Promise.all(
        employees.map(async (employee) => {
          const distance =
            employee.location?.lat && employee.location?.lng
              ? await this.calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  employee.location.lat,
                  employee.location.lng
                )
              : Infinity; // If location is missing, set to Infinity

          return {
            employee,
            distance,
          };
        })
      );

      // Filter employees who are within 5 km
      const nearbyEmployees = employeesWithDistances.filter(
        (item) => item.distance <= 5
      );

      // Sort employees by proximity to the user's location
      const sortedEmployees = nearbyEmployees.sort(
        (a, b) => a.distance - b.distance
      );

      // Return the sorted list of employees wrapped in EmployeeEntities
      return sortedEmployees.length
        ? sortedEmployees.map(
            (item) =>
              new EmployeeEntities(
                item.employee.id,
                item.employee.username,
                item.employee.email,
                item.employee.phone,
                item.employee.password,
                item.employee.skills,
                item.employee.experience,
                item.employee.isValidated,
                item.employee.proof,
                item.employee.isActive,
                item.employee.profilePic,
                item.employee.location,
                item.employee.authSource,
                item.employee.role,
                item.employee.revenue,
                item.employee.onDuty,
                item.employee.FCM_Token,
                item.employee.createdAt,
                item.employee.updatedAt
              )
          )
        : []; // Return empty array if no employees found
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw new Error("Failed to fetch employees");
    }
  }

  async findempnearest10km(userLocation: {
    lat: number;
    lng: number;
  }): Promise<EmployeeEntities[]> {
    const employees = await EmployeeModel.find({
      "location.lat": { $exists: true },
      "location.lng": { $exists: true },
    });
    // Map employees to include calculated distances and filter by 5 km radius
    const employeesWithDistances = await Promise.all(
      employees.map(async (employee) => {
        const distance =
          employee.location?.lat && employee.location?.lng
            ? await this.calculateDistance(
                userLocation.lat,
                userLocation.lng,
                employee.location.lat,
                employee.location.lng
              )
            : Infinity; // If location is missing, set to Infinity

        return {
          employee,
          distance,
        };
      })
    );
    // Filter employees who are within 5 km
    const nearbyEmployees = employeesWithDistances.filter(
      (item) => item.distance <= 10
    );
    return nearbyEmployees.length
      ? nearbyEmployees.map(
          (item) =>
            new EmployeeEntities(
              item.employee.id,
              item.employee.username,
              item.employee.email,
              item.employee.phone,
              item.employee.password,
              item.employee.skills,
              item.employee.experience,
              item.employee.isValidated,
              item.employee.proof,
              item.employee.isActive,
              item.employee.profilePic,
              item.employee.location,
              item.employee.authSource,
              item.employee.role,
              item.employee.revenue,
              item.employee.onDuty,
             item.employee.FCM_Token,
              item.employee.createdAt,
              item.employee.updatedAt
            )
        )
      : []; // Return empty array if no employees found
  }

  async findIdAndDecrementRevenue(
    id: string,
    revenue: number
  ): Promise<EmployeeEntities | null> {
    const employee = await EmployeeModel.findByIdAndUpdate(
      id,
      { $inc: { revenue: -Math.abs(revenue) } }, // Increment the revenue field
      { new: true } // Return the updated document
    );

    if (!employee) return null;

    return new EmployeeEntities(
      employee.id,
      employee.username,
      employee.email,
      employee.phone,
      employee.password,
      employee.skills,
      employee.experience,
      employee.isValidated,
      employee.proof,
      employee.isActive,
      employee.profilePic,
      employee.location,
      employee.authSource,
      employee.role,
      employee.revenue,
      employee.onDuty,
      employee.FCM_Token,
      employee.createdAt,
      employee.updatedAt
    );
  }

  async checkValidate(empId: string): Promise<boolean | null> {
    const employee = await EmployeeModel.findById(empId);
    if (!employee) return null;
    return employee.isValidated;
  }

  async setValidate(empId: string): Promise<boolean> {
    const mechanic = await EmployeeModel.findByIdAndUpdate(
      empId,
      { $set: { isValidated: true } },
      { new: true } // Ensures the updated document is returned
    );

    if (!mechanic) return false;
    return true;
  }

  async findByIdAndUpdate_FCMToken(id: string, token: string): Promise<void> {
    await EmployeeModel.findByIdAndUpdate(
      id,
      {
        $set: { FCM_Token: token },
      },
      { upsert: true, new: true }
    );
  }
}
