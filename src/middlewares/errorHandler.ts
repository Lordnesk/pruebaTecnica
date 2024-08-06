import { Request, Response, NextFunction } from "express";
interface ErrorResponse {
    message: string;
    stack?: string;
}

export const errrorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) =>{
    console.error(err.stack);
    
    res.json({
        status: 500,
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};