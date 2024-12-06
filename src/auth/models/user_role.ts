import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "./user.model";
import { UserRoles } from "./user_roles";
@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: UserRoles,
    })
    name: UserRoles;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
