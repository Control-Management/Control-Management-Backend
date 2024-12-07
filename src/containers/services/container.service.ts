
import { Inject, Injectable } from '@nestjs/common';
import { IContainerService } from './icontainer.service';
import { ContainerRequestDTO } from '../dto/container.request.dto';
import { ContainerResponseDTO } from '../dto/container.response.dto';
import { IContainerRepositoryToken } from '../repositories/container.repository';
import { IContainerRepository } from '../repositories/icontainer.repository';
@Injectable()
export class ContainerService implements IContainerService{

    constructor(@Inject(IContainerRepositoryToken) private containerRepository: IContainerRepository) { }
    async create(containerRequestDTO: ContainerRequestDTO): Promise<ContainerResponseDTO> {
        return await this.containerRepository.create(containerRequestDTO);
    }
    async findAll(): Promise<ContainerResponseDTO[]> {
        return await this.containerRepository.findAll();
    }
    async findByType(type: string): Promise<ContainerResponseDTO[]> {
        return await this.containerRepository.findByType(type);
    }
    async findByUserId(userId: number): Promise<ContainerResponseDTO[]> {
        return await this.containerRepository.findByUserId(userId);
    }
    async update(id: number, containerRequestDTO: ContainerRequestDTO): Promise<ContainerResponseDTO> {
        return await this.containerRepository.update(id, containerRequestDTO);
    }
    async delete(id: number): Promise<boolean> {
        return await this.containerRepository.delete(id);
    }

}

export const IContainerServiceToken = 'IContainerServiceToken';