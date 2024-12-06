import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../models/user_role';
import { UserRoles } from '../models/user_roles';


@Injectable()
export class RoleSeederService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>,
    ) {}

    async onApplicationBootstrap() {
        const roles = Object.values(UserRoles);

        for (const role of roles) {
            const exists = await this.userRoleRepository.findOne({ where: { name: role } });
            if (!exists) {
                await this.userRoleRepository.save({ name: role });
                console.log(`Role "${role}" created.`);
            }
        }
    }
}
