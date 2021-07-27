import { NextFunction, Response,Request } from "express";
import { ENVIRONMENT } from "../Config";

interface HttpError extends Error{
    status?:number,
    code?:string
} 

export default (Error:HttpError,req:Request,res:Response,next:NextFunction) =>{
    res.status(Error.status || 500)
    res.send({
        data:{
            message:Error.message,
            stack: ENVIRONMENT == "local" ? Error.stack : undefined
        },
        status:Error.status || 500
    })
}