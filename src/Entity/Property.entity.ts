import { Entity, Column, PrimaryColumn, ManyToOne, Generated, OneToMany, JoinTable, RelationId, JoinColumn } from "typeorm";
import { Availability } from "./Availability.entity";
import { Building } from "./Building.entity";
import { amenities_enum, property_type_enum } from "./enum";
import { Reservation } from "./Reservation.entity";


@Entity()
export class Property  {

    @PrimaryColumn({
        type:"integer",
        nullable:false
    })
    @Generated("increment")
    id: number;

    @Column({
        nullable:false,
        type:"simple-enum",
        enum:property_type_enum,
    })
    property_type:string

    @Column({
        array:true,
        nullable:false,
        type:"simple-enum",
        enum:amenities_enum,
    })
    amenities:string

    @Column({
        nullable:false,
        type:"text",
        unique:true
    })
    title  :string

    @ManyToOne(()=>Building,building => building.properties,{
        cascade:["insert"],
        onDelete:"CASCADE"
    })
    @JoinColumn({name:"building_id",referencedColumnName:"id"})
    Building:Building


    @OneToMany(() => Reservation,resiveration => resiveration.Property,{
        cascade:["insert"],
        onDelete:"CASCADE"
    })
    reservations:  Reservation[]

    @OneToMany(() => Availability,Availability => Availability.Property,{
        cascade:["insert"],
        onDelete:"CASCADE"
    })
    availability:  Availability[]
}