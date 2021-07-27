import { Equal } from "typeorm";
import { filterRequest } from "./FilterAdapter";

export default (req: filterRequest) => {
  const { date } = req.body;

  const alias = req.filter?.alias;
  if (!date) return req;
  else if (!req.filter) return req;
  else
    req.filter
      .leftJoinAndSelect(`${alias}.availability`, "availability")
      .leftJoinAndSelect(`${alias}.reservations`, "reservations")
      .where("availability.start_date >= :checkIn AND availability.end_date <= :checkOut", { checkIn:date.start,checkOut:date.end })
      .andWhere("(reservations.check_in NOT BETWEEN :checkIn AND :checkOut) AND (reservations.check_out NOT BETWEEN :checkIn AND :checkOut)", { checkIn:date.start,checkOut:date.end })
  return req;
};
