import { Router } from "express";
import {Index} from "./property.controller";
const Route = Router();

Route.get("/",Index)

export default Route;