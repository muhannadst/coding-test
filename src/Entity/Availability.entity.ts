import { Entity, Column, PrimaryColumn, ManyToOne, Generated, JoinColumn } from "typeorm";
import { Property } from "./Property.entity";


@Entity()
export class Availability  {

    @PrimaryColumn({
        type:"integer",
        nullable:false
    })
    @Generated("increment")
    id: number;

    @Column({
        type:"date",
        nullable:false
    })
    start_date:string

    @Column({
        type:"date",
        nullable:false
    })
    end_date:string

    @ManyToOne(()=>Property,undefined,{
        cascade:["remove","insert"],
        onDelete:"CASCADE"
    })
    @JoinColumn({name:"property_id"})
    Property:Property

    @Column({
        type:"boolean"
    })
    is_blocked:boolean
  
}