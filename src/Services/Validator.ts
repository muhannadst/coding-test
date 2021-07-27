import { Request } from "express";
import Ajv, { AnySchemaObject, ErrorObject } from "ajv";
import BadRequestError from "../Helper/Errors/BadRequestError";
const ajv = new Ajv()
export default (payload:any,schema:AnySchemaObject) =>{
    const parse = ajv.compile(schema)
    const data = parse(payload)
    if (!data) {
        const ErrorMessage = parse.errors?.reduce((msg:string,e:ErrorObject) => {
            return `${msg} ${msg && ","} ${e.instancePath} ${e.message}`
        },"") 
        throw new BadRequestError(ErrorMessage || "Someting is missing")
    }
    return data
}