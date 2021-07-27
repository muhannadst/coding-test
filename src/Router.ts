import { Router,Response,Request } from "express";
import PropetyRoute from "./API/Property/property.route"
const Route = Router();

Route.use("/property",PropetyRoute)


Route.get("/",(_:Request,res:Response)=> res.send("App v1"))

export default Route