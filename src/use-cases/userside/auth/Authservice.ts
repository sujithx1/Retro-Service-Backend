import { OAuth2Client } from "google-auth-library";
import { IUserRepositories } from "../../../interfaces/repositories/userSide/IUserrRepositories";
import { UserIntities } from "../../../entities/Userentities";

const client=new OAuth2Client(process.env.google_Client_ID)

export class User_Google_Auth_useCase{
    constructor(private userrepositories:IUserRepositories){

    }

    async execute(token:string):Promise<UserIntities>{
        const ticket=await client.verifyIdToken({
            idToken:token,
            audience:process.env.google_Client_ID
        })
        
        const payload=ticket.getPayload()
        if(!payload || !payload.email) throw new Error("no payload")
        let user=await this.userrepositories.findByemail(payload.email)
         
        if (!user) {

            const userData=new UserIntities(
                "",
                payload.name!,
                payload.email!,
                "",
                "",
                true,
                payload.picture!,
                false,
                "google",
               

                
            )

            user=await this.userrepositories.save(userData)
            
            
        }

        return user

    }
}