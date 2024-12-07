import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContainerTypes } from "./container_types";
import { Container } from "./container.model";

@Entity()
export class ContainerType{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: 'enum',
        enum: ContainerTypes,
    })
    type: ContainerTypes;

    @OneToMany(()=> Container, (container) => container.type)
    conatainers: Container[];
}