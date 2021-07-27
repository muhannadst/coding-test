import { Request } from "express";
import { FindManyOptions, Repository, SelectQueryBuilder } from "typeorm";
import { customeRequest } from "../../API/Property/property.controller";
import { Property } from "../../Entity/Property.entity";

export interface filterRequest extends customeRequest {
    filter?: SelectQueryBuilder<Property>
}


type fn = (
    (data: any) => filterRequest
  );
export default (req:filterRequest,repo:Repository<Property>,functions:fn[] = [] ):SelectQueryBuilder<any> | undefined => {
    req.filter = repo.createQueryBuilder()
    return functions.reduce((req,fn)=>fn(req),req).filter
}