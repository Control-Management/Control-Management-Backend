import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";
import { UserRole } from "./user_role";
import { Container } from "src/containers/models/container.model";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    username: string;
    @Column()
    thumbnail: string;
    @ManyToOne(type => UserRole, role=> role.users)
    role: UserRole

    @OneToMany(container => Container, container => container.user)
    containers: Container[]


}