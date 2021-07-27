import { filterRequest } from "./FilterAdapter";

export default (req: filterRequest) => {
  const { city } = req.body;
  const alias = req.filter?.alias;
  if (!city) return req;
  else if (!req.filter) return req;
  else
    req.filter
      .leftJoinAndSelect(`${alias}.Building`, "building")
      .where("building.city = :city", { city });
  return req;
};
