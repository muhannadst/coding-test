import { createConnection, getRepository } from "typeorm";
import { Building } from "../src/Entity/Building.entity";
import { Property } from "../src/Entity/Property.entity";
import { Reservation } from "../src/Entity/Reservation.entity";
const seed = async () => {
  await createConnection();
  console.log("Db connected");
  const BuildingRepository = getRepository(Building);

  BuildingRepository.clear();
  

  const DubaiPropery:any[] = [
    {
      title: "Unit 1",
      property_type: "1bdr",
      amenities: `WiFi`,
      reservations: [
        { check_in: "2021-05-01", check_out: "2021-05-10" },
        { check_in: "2021-06-01", check_out: "2021-06-03" },
      ],
    },
    {
      title: "Unit 2",
      property_type: "2bdr",
      amenities: "Tennis table",
      reservations: [{ check_in: "2021-06-02", check_out: "2021-06-07" }],
      availability: [
        { start_date: "2021-07-01", end_date: "2021-07-20", is_blocked: true },
      ],
    },
    {
      title: "Unit 3",
      property_type: "3bdr",
      amenities: "Garden",
    },
  ];


  const MontrealProperty:any[] = [
    {
      title: "Unit 4",
      property_type: "1bdr",
      amenities: "Garden",
    },
  ];

  await BuildingRepository.save(
    {
      city: "Dubai",
      properties:DubaiPropery
    }
    );
  await BuildingRepository.save(
    {
      city: "Montreal",
      properties:MontrealProperty
    }
    );


  console.log("Seeding Successfull");
};

seed();
