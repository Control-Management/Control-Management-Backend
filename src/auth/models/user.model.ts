import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";
import { UserRole } from "./user_role";

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


}