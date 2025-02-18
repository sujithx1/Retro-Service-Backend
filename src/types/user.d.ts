export interface FinduserLocation{
    lat:number,
    lng:number,
    address:string,
    
}
export interface Address_Types {
    country: string;
    county: string;
    neighbourhood: string;
    postcode: string;
    road: string;
    state: string;
    state_district: string;
    suburb: string;
    town: string;
  }
  export interface Locationuser_types{
    lat:number,
    lng:number,
    address:Address_Types
  }
  
export interface Location{
    lat:number,
    lng:number
}

export interface  ServiceDetails{
    name:string,
    phone:string;
    problem:string;
    vehicleNumber:string

}