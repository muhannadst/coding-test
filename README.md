Create a standalone program/script to implement the logic in this test, in the language of your choice, preferrably in Node.js.

You may also build it as a REST or GraphQL service.

On our site, guests can check the availability of units by city, date range, and a few other optional filters.

We aim to redesign this feature to provide more flexibility to guests. Assume the current API params look something like this:

```
{city: 'Dubai', date: {start: '2021-06-01', end: '2021-06-03'}}
```

This returns all Dubai units that are available to book from June 1st to the 3rd.


The algorithm must refine the params and take the following as an input:

```
{
city: 'Dubai',
date: {start, end},
flexible: {type, months},
"apartmentType": null,
amenities: ["WiFi", "Pool"]
}
```

Where "city" is mandatory to set, and the program can take one of "date" or "flexible" but not both. "Amenities" filters the units that support the requested values.


"apartmentType" is optional (example: 1bdr, 2bdr), see the sample SQL at the end for examples of amenities & apartment types.


flexible.type can be one of "weekend", "week" or "month", and flexible.months is an array of 3-letter months, for example: ["may", "jun", ..].

So submitting flexible {type: "week", months: ["may", "jun"]} tells the service to find a unit that is available for at least a week during May or June.

Weekends vary across cities, so if you're checking for a Dubai weekend, that would be Fri & Sat, but if it's Montreal for example, then it's Sat & Sun.

The code must be efficient, built with many concurrent web requests in mind.

The result outputed from the algorithm would look something like this:

```
{match: [], alternative: [], other: []}
```

"match" is an array of one or more units exactly matching the request (within city, matching "date" or "flexible" and any additional filters).
Example: match: [1, 2, 3] where the numbers represent the IDs of units.

"alternative", the closest alternative dates if no exact matches were found, for example, if the guest asks for a one-bedroom apartment from June 1st to June 3rd but that date is not available, you should return the closest availability, preferring June 2nd -> June 4th over June 5th -> June 7th if both dates are available.

Example: alternative: [{id: 1, availableStarting: "2021-06-02"}, {..}]


"Other" is a further set of suggestions if no matches were found for the same unit type and number of bedrooms, for example, if the request is originally for a one-bedroom apartment during Feb, but that unit is only available starting August, then "other" would include other units (1 bedroom, 2 bedrooms, etc.) that match or are close to the requested date filters (but must still be within the same city).


Setup a relational database of your choice, create the models and load the fixture and then build the program on top of it.

```sql
create schema test;

-- each property is attached to a building (1 to 1)

create type test.city as ENUM ('Dubai', 'Montreal');
create table test.building (
    id bigserial primary key not null,
    city test.city not null
);

insert into test.building (city) values ('Dubai');
insert into test.building (city) values ('Montreal');

-- properties/units
-- supported amenities on units, we'll use this for additional filtering
create type test.amenities_enum as ENUM ('WiFi', 'Pool', 'Garden', 'Tennis table', 'Parking');
create type test.property_type_enum as ENUM ('1bdr', '2bdr', '3bdr');

create table test.property (
    id bigserial primary key not null,
    building_id bigint references test.building on delete cascade not null,
    title text unique not null,
    property_type test.property_type_enum not null,
    amenities test.amenities_enum[] not null
);

insert into test.property (building_id, title, property_type, amenities) VALUES (1, 'Unit 1', '1bdr', '{WiFi,Parking}');
insert into test.property (building_id, title, property_type, amenities) VALUES (1, 'Unit 2', '2bdr', '{WiFi,Tennis table}');
insert into test.property (building_id, title, property_type, amenities) VALUES (1, 'Unit 3', '3bdr', '{Garden}');
insert into test.property (building_id, title, property_type, amenities) VALUES (2, 'Unit 4', '1bdr', '{Garden,Pool}');


-- reservations per unit
create table test.reservation (
    id bigserial primary key not null,
    check_in date not null,
    check_out date not null,
    property_id bigint references test.property on delete cascade not null
);

insert into test.reservation (check_in, check_out, property_id) VALUES ('2021-05-01', '2021-05-10', 1);
insert into test.reservation (check_in, check_out, property_id) VALUES ('2021-06-01', '2021-06-03', 1);
insert into test.reservation (check_in, check_out, property_id) VALUES ('2021-06-02', '2021-06-07', 2);


-- manual availability settings
create table test.availability (
    id bigserial primary key not null,
    property_id bigint references test.property on delete cascade not null,
    start_date date not null,
    end_date date not null,
    is_blocked boolean default false
);

-- Note: when checking a unit availability, query both test.reservation & test.availability, if a unit has a reservation on an overlapping date range, or if it's
-- manually blocked (for example: for maintenance) and has an entry with is_blocked set to true with an overlapping start_date & end_date in test.availability

insert into test.availability (property_id, start_date, end_date, is_blocked) values (1, '2021-07-01', '2021-07-20', true);
```



