


import bcrypt from "bcrypt";


export const hashpass=async (password:string):Promise<string> => {
    const salt=10;
    
    return await bcrypt.hash(password,salt);
    
};

export const comparePassword=async (password:string,userpasword:string):Promise<boolean>=>{


    return await bcrypt.compare(password,userpasword);
    
};


