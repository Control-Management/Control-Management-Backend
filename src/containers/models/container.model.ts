import { User } from "src/auth/models/user.model";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContainerType } from "./container_type";

@Entity()
export class Container{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    quantity: number;
    
    @ManyToOne(user => User, user=> user.containers)
    user: User;
    @ManyToOne(()=> ContainerType, type => type.conatainers)
    type: ContainerType;
}