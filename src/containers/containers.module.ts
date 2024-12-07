import { Module } from '@nestjs/common';
import { ContainerController } from './controller/container.controller';
import { ContainerRepository, IContainerRepositoryToken } from './repositories/container.repository';
import { ContainerService, IContainerServiceToken } from './services/container.service';
import { Container } from './models/container.model';
import { ContainerType } from './models/container_type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerTypesSeederService } from './services/seed-container-types.service';
import { User } from 'src/auth/models/user.model';

@Module({
    controllers: [ContainerController],
    providers: [
        {
            provide: IContainerRepositoryToken,
            useClass: ContainerRepository,
        },
        {
            provide: IContainerServiceToken,
            useClass: ContainerService,
        },
        ContainerTypesSeederService
    ],
    imports: [
        TypeOrmModule.forFeature([Container, ContainerType, User]),
    ],
    exports: [IContainerRepositoryToken, IContainerServiceToken]
})
export class ContainersModule {}
