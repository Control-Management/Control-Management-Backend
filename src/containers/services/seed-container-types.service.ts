import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContainerType } from '../models/container_type';
import { ContainerTypes } from '../models/container_types';


@Injectable()
export class ContainerTypesSeederService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(ContainerType)
        private readonly containerTypeRepository: Repository<ContainerType>,
    ) {}

    async onApplicationBootstrap() {
        const types = Object.values(ContainerTypes);

        for (const type of types) {
            const exists = await this.containerTypeRepository.findOne({ where: { type: type } });
            if (!exists) {
                await this.containerTypeRepository.save({ type: type });
                console.log(`Container type "${type}" created.`);
            }
        }
    }
}