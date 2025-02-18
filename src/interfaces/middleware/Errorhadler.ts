
// import { Request, Response, NextFunction } from 'express';

// export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   console.error(err.message);
  
  
//   const statusCode = err.statusCode || 500; 
//   const message = err.message || 'Internal Server Error'; 

  
//   res.status(statusCode).json({
//     success: false,
//     error: message,
//   });
// };

// middlewares/error-handler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../utils/errors/error.enum';
import { CustomError } from '../../utils/errors/custom.errors';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error stack:', err.stack);
  console.error('Error message:', err.message);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
        error: err.message,
        code: err.errorCode,
     
    });
  }

  res.status(500).json({
    success: false,
   
      error: 'Internal Server Error',
      code: AppError.ServerError,
    
  });
};
