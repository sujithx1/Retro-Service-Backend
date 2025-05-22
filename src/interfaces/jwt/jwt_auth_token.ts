import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

const AccessToken_secretKey = process.env.ACCESS_TOKEN || "";
const RefreshToken_secretKey = process.env.REFRESH_TOKEN || "";


export const GenerateAccessToken = (id: string, role: string): string => {

    return jwt.sign({ id, role }, AccessToken_secretKey, {
        expiresIn: "24h",
        algorithm: "HS256",
    });
};

// Function to generate refresh tokens
export const GenerateRefreshToken = (id: string, role: string): string => {
    
    const refresh = jwt.sign({ id, role }, RefreshToken_secretKey, {
        expiresIn: "7d",
    });
  
    console.log("Generated Refresh Token:", refresh);
   
    return refresh;
};

// Function to remove expired refresh tokens (optional)


// Endpoint to create a new access token using a refresh token
export const createAccessToken = (req: Request, res: Response,role:string):void => {
    console.log(role);
    
    const roleToken=`${role}_refreshToken`;
    console.log(roleToken);
    

    
    const refreshtoken:string = req.cookies[roleToken];
    
    
    console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",refreshtoken);
    
    
 
    // console.log(refreshtoken,"refffffffffffffffffffffffff");
    



    // Check if the refresh token exists and is valid
    if (!refreshtoken ) {
        res.status(403).json({ error: "Refresh token is invalid or missing" });
        return;
    }

    // Verify the refresh token
    jwt.verify(
        refreshtoken,
        RefreshToken_secretKey,
        (err: Error | null, decoded: string | JwtPayload | undefined) => {
            if (err) {
                if ((err as any).name === "TokenExpiredError") {
                    res.status(403).json({ error: "Refresh token expired" });
                    return;
                }
                res.status(403).json({ error: "Token verification failed" });
                return;
            }

            if (typeof decoded === "object" && decoded !== null) {
                const { id, role } = decoded as JwtPayload;

                if (!id || !role) {
                    res.status(403).json({ error: "Invalid payload in token" });
                    return; 
                }

                // Generate a new access token
                const newAccessToken = GenerateAccessToken(id, role);
                console.log("accesssssssssssssssssssssss",newAccessToken);
                
                res.status(200).json({ accessToken: newAccessToken });
                return;
            }

            res.status(403).json({ error: "Invalid token" });
            return;
        }
    );
};


