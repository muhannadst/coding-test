## Clone Repo

## Install dependecy
``` npm install ```

## Seed DataBase
 
``` npm run seed ```

## Set environment 

``` cp .example.env .env ``` 

Edit env and add 
```
PORT= {Port You want to run}
ENVIRONMENT=local

```

## Now run app 

```
Npm run dev
```
## Now do a get request at 
/property

with paylod of json
like this
```
{
"city" : "Dubai",
"date": {"start":"", "end":""},
"flexible": {"type":"weekend", "months":["may", "jun"]},
"apartmentType": null,
"amenities": ["WiFi", "Pool"]
}
```

Filter will not work for amenities as I am using sqlite and it does has feature to store array



