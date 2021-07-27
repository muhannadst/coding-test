import { Request, Response, NextFunction } from "express";
import { isEmpty } from "lodash";
import moment from "moment";
import { getRepository, Like } from "typeorm";
import { Property } from "../../Entity/Property.entity";
import { PropertyAviability, PropertyCityFilter, PropertyFlexible } from "../../Services/Filter";
import filterAdapter from "../../Services/Filter/FilterAdapter";
import Validator from "../../Services/Validator";
import { findQuerySchema } from "./propety.validator";

export interface customeRequest extends Request{
  location?: string;
}

export const Index = async (
  req: customeRequest,
  res: Response,
  next: NextFunction
) => {
  try {

    Validator(req.body, findQuerySchema);
    req.location = "Montreal"
    const repo = getRepository(Property)
    let alternative:any = []
    const property = await filterAdapter(req,repo, [
      PropertyCityFilter,
      PropertyAviability,
      PropertyFlexible
    ])?.select(["Property.id AS id","availability.start_date AS availableStarting"]).getRawMany();

    if(isEmpty(property) && !isEmpty(req.body.date)){
      const {start,end} = req.body.date
      req.body.date = {
        start: moment(start).subtract(1,'d'),
        end: moment(end).subtract(1,'d')
      }
      const beforClose = await filterAdapter(req,repo, [
        PropertyCityFilter,
        PropertyAviability,
        PropertyFlexible
      ])?.select(["Property.id AS id","availability.start_date AS availableStarting"]).getRawMany();

      req.body.date = {
        start: moment(start).add(1,'d'),
        end: moment(end).add(1,'d')
      }
      const afterClose = await filterAdapter(req,repo, [
        PropertyCityFilter,
        PropertyAviability,
        PropertyFlexible
      ])?.select(["Property.id AS id","availability.start_date AS availableStarting"]).getRawMany();

      if(beforClose) alternative.push(...beforClose)
      if(afterClose)alternative.push(...afterClose)
    }

    res.send({ data: {
      match:property?.map(({id}) => id) || [],
      alternative
    } });
  } catch (e) {
    next(e);
  }
};
