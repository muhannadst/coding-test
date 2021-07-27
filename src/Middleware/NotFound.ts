import { NextFunction, Response,Request } from "express";
import NotFoundError from "../Helper/Errors/notFoundError";
export default (req:Request,res:Response,next:NextFunction) =>{
    const error = new NotFoundError(`${req.method} ${req.path} Not Found`)
}