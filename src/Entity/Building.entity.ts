import { Entity, Column, PrimaryColumn, Generated, OneToMany, JoinColumn } from "typeorm";
import { cityEnum } from "./enum";
import { Property } from "./Property.entity";


@Entity()
export class Building {

    @PrimaryColumn({
        type:"integer",
        nullable:false
    })
    @Generated("increment")
    id: number;

    @Column({
        nullable:false,
        type:"simple-enum",
        enum:cityEnum
    })
    city:string

    @OneToMany(() => Property,property => property.Building,
    {
        cascade:["insert","remove"]
    })
    properties:  Property[]
  
}