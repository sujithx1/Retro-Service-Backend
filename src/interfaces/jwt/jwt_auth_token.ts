import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

const AccessToken_secretKey = process.env.access_token || "";
const RefreshToken_secretKey = process.env.refresh_token || "";


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
    

    
    const refreshtoken:string = req.cookies[role]
    
    console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",refreshtoken);
    
    
    if (!refreshtoken) {
        res.status(403).json({ error: 'Refresh token is missing' });
        return 
    }
    console.log(refreshtoken,"refffffffffffffffffffffffff");
    



    // Check if the refresh token exists and is valid
    if (!refreshtoken ) {
        res.status(403).json({ error: "Refresh token is invalid or missing" });
        return
    }

    // Verify the refresh token
    jwt.verify(
        refreshtoken,
        RefreshToken_secretKey,
        (err: Error | null, decoded: string | JwtPayload | undefined) => {
            if (err) {
                if ((err as any).name === "TokenExpiredError") {
                    res.status(403).json({ error: "Refresh token expired" });
                    return
                }
                res.status(403).json({ error: "Token verification failed" });
                return
            }

            if (typeof decoded === "object" && decoded !== null) {
                const { id, role } = decoded as JwtPayload;

                if (!id || !role) {
                    res.status(403).json({ error: "Invalid payload in token" });
                    return 
                }

                // Generate a new access token
                const newAccessToken = GenerateAccessToken(id, role);
                console.log("accesssssssssssssssssssssss",newAccessToken);
                
                res.status(200).json({ accessToken: newAccessToken });
                return
            }

            res.status(403).json({ error: "Invalid token" });
            return
        }
    );
};




// import jwt, { JwtPayload } from "jsonwebtoken";
// import { Request, Response } from 'express';
// const AccessToken_SecretKey = process.env.AccessToken_SECRETKEY || "access123";
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh123";

// const refreshTokens: string[] = [];

// // Function to generate an access token with id and role
// export const GenerateAccessToken = (id: string, role: string): string => {
//   return jwt.sign({ id, role }, AccessToken_SecretKey, {
//     expiresIn: "15m",
//     algorithm: 'HS256'
//   });
// };

// // Function to generate a refresh token with id and role
// export const GenerateRefreshToken = (id: string, role: string): string => {
//   const refreshToken = jwt.sign({ id, role }, REFRESH_TOKEN_SECRET, {
//     expiresIn: '7d'
//   });
//   refreshTokens.push(refreshToken);
//   return refreshToken;
// };

// // Function to create a new access token using a refresh token
// export const createAccessToken = (req: Request, res: Response) => {
//   const refreshtoken = req.cookies.user_refreshToken;
//   console.log(refreshtoken);
  

//   if (!refreshtoken || !refreshTokens.includes(refreshtoken)) {
//     return res.status(403).json({ message: "Refresh token is invalid or missing." });
//   }

//   jwt.verify(refreshtoken, REFRESH_TOKEN_SECRET, (err: Error | null, decoded: string | JwtPayload | undefined) => {
//     if (err) {
//       return res.status(403).json({ message: "Token verification failed." });
//     }

//     let id: string;
//     let role: string;

//     if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'role' in decoded) {
//       id = (decoded as JwtPayload).id as string;
//       role = (decoded as JwtPayload).role as string;
//     } else {
//       return res.status(403).json({ message: "Invalid token structure." });
//     }

//     const newAccessToken = GenerateAccessToken(id, role);
//     res.json({ accessToken: newAccessToken });
//   });
// };
