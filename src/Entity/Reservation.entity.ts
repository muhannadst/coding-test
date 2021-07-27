import { Entity, Column, PrimaryColumn, ManyToOne, Generated, JoinColumn } from "typeorm";
import { Property } from "./Property.entity";


@Entity()
export class Reservation  {

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
    check_in:string

    @Column({
        type:"date",
        nullable:false
    })
    check_out:string

    @ManyToOne(()=>Property,undefined,{
        cascade:["remove"],
        onDelete:"CASCADE"
    })
    @JoinColumn({name:"property_id",referencedColumnName:"id"})
    Property :Property
  
}