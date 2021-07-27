import moment from "moment";
import BadRequestError from "../../Helper/Errors/BadRequestError";
import { filterRequest } from "./FilterAdapter";

export default (req: filterRequest) => {
  const { date,flexible } = req.body;
  const locationWeekend:any={
    Dubai:[5,6],
    Montreal:[6,7]
  }
  const typeQuery:any={
    "weekend":7, 
    "week":7, 
    "month":30
  }
  if(date && flexible) throw new BadRequestError("Either flexible or Date Should Be present")
  const alias = req.filter?.alias;
  if (!flexible) return req;
  else if (!req.filter) return req;
  else{
    const numericMonth = flexible.months.map((month:string) => moment().month(month).format("MM"))
    if(flexible.type != "weekend"){
      const type:any = typeQuery[flexible.type];
      req.filter
        .leftJoinAndSelect(`${alias}.availability`, "availability")
        .leftJoinAndSelect(`${alias}.reservations`, "reservations")
        .where(`availability.start_date >= DATE() AND strftime('%m',availability.start_date) IN (:...months) AND date(availability.start_date, '+${type} day') BETWEEN availability.start_date AND availability.end_date`, { months:numericMonth })
        .andWhere(`reservations.check_in NOT BETWEEN date(availability.start_date, '+${type} day') AND  availability.start_date AND reservations.check_out <= date(availability.end_date,'-${type} day')`,{ months:numericMonth })
    }else{
      const weekendDay = locationWeekend[req.location || "Dubai"] || locationWeekend["Dubai"];

      req.filter
        .leftJoinAndSelect(`${alias}.availability`, "availability")
        .leftJoinAndSelect(`${alias}.reservations`, "reservations")
        .where(`availability.start_date >= DATE() AND strftime('%m',availability.start_date) IN (:...months) AND ((strftime('%w',availability.start_date) >= ${weekendDay[0]} AND strftime('%w',availability.end_date) <= ${weekendDay[1]}) OR (availability.end_date >= date(availability.start_date, '+5 day')))`, { months:numericMonth })
        .andWhere(`DATE() NOT BETWEEN date(reservations.check_in) AND  reservations.check_out OR reservations.check_out <= date(availability.end_date,'-2 day')`)
    }
    
  }
  return req;
};
