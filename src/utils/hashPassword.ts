


import bcrypt from "bcrypt"


export const hashpass=async (password:string):Promise<string> => {
    const salt=10
    
    return await bcrypt.hash(password,salt)
    
}

