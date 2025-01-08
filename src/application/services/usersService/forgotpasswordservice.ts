import { generate_otp } from "../../../utils/otp";



export class Forgot_password_service{
    // constructor(private fogot_password) {
        
    // }

    constructor(
        
    ){}

    async service(email:string){
        if(!email) throw new Error("missing email")

                  const otp = generate_otp();
                  console.log("otp", otp); 


    }



}