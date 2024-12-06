import { Injectable } from "@nestjs/common";
import { IAuthRepository } from './iauth.repository';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../models/user.model";
import { Repository } from "typeorm";
import { UserRoles } from "../models/user_roles";
import { UserRole } from "../models/user_role";

@Injectable()
export class AuthRepository implements IAuthRepository{
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>
        ){}
    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({where: {email: email}})
    }
    async getRoleName(role: UserRoles): Promise<UserRole> {
        return await this.userRoleRepository.findOne({ where: { name: role } });
    }

    async isUserExists(email: string, username: string): Promise<boolean> {
        return await this.userRepository.existsBy({email, username});
    }
    async createUser(user: User): Promise<void> {
        await this.userRepository.save(user);
    }
    

}

export const IAuthRepositoryToken = "IAuthRepositoryToken"