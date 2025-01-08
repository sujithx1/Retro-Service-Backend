


export class CheckOtp{
    async execute(userOtp: number, cookieOtp: number): Promise<boolean> {
        if (!cookieOtp) {
          throw new Error("Cookie OTP is missing");
        }
      
        if (userOtp !== cookieOtp) {
          throw new Error("Otp not matching");
        }
       
        return true;
      }
    }      