import { Injectable } from "@nestjs/common";
import { IContainerRepository } from "./icontainer.repository";
import { ContainerRequestDTO } from "../dto/container.request.dto";
import { ContainerResponseDTO } from "../dto/container.response.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Container } from "../models/container.model";
import { Equal, Repository } from "typeorm";
import { ContainerType } from "../models/container_type";
import { User } from "src/auth/models/user.model";
import { ContainerTypes } from "../models/container_types";

@Injectable()
export class ContainerRepository implements IContainerRepository{

    constructor(
        @InjectRepository(Container) private containerRepository: Repository<Container>,
        @InjectRepository(ContainerType) private containerTypeRepository: Repository<ContainerType>,
        @InjectRepository(User) private userRepository: Repository<User>
        ) { }
    async create(containerRequestDTO: ContainerRequestDTO): Promise<ContainerResponseDTO> {
        const containerToAdd = new Container();
        containerToAdd.name = containerRequestDTO.name;
        containerToAdd.description = containerRequestDTO.description;
        containerToAdd.quantity = containerRequestDTO.quantity;
        const containerType = await this.containerTypeRepository.find( { where :{id: containerRequestDTO.typeId}})
        const userFound = await this.userRepository.findOne({where: {id: containerRequestDTO.userId}})
        containerToAdd.type = containerType[0];
        containerToAdd.user = userFound;
        const containerAdded = await this.containerRepository.save(containerToAdd);
        return new ContainerResponseDTO(containerAdded.id, containerAdded.name, containerAdded.description, containerAdded.quantity, containerAdded.type.type, {id: containerAdded.user.id, username: containerAdded.user.username});
    }
    async findAll(): Promise<ContainerResponseDTO[]> {
        const containers = await this.containerRepository.find({relations: ['type', 'user']});
        return containers.map(container => new ContainerResponseDTO(container.id, container.name, container.description, container.quantity, container.type.type, {id: container.user.id, username: container.user.username}));
    }
    async findByType(type: ContainerTypes): Promise<ContainerResponseDTO[]> {
        const containers = await this.containerRepository.find({
            relations: ['type', 'user'],
            where: { type: { type: Equal(type) } },
        });
    
        return containers.map(container => 
            new ContainerResponseDTO(
                container.id,
                container.name,
                container.description,
                container.quantity,
                container.type.type,
                { id: container.user.id, username: container.user.username }
            )
        );
    }
    async findByUserId(userId: number): Promise<ContainerResponseDTO[]> {
        const userFound = await this.userRepository.findOne({where: {id: userId}})
        const containers = await this.containerRepository.find({ where: {user: userFound}, relations: ['type', 'user']});
        return containers.map(container => new ContainerResponseDTO(container.id, container.name, container.description, container.quantity, container.type.type, {id: container.user.id, username: container.user.username}));
    }
    async update(id: number, containerRequestDTO: ContainerRequestDTO): Promise<ContainerResponseDTO> {
        const containerToUpdate = await this.containerRepository.findOne({where: {id: id}});
        containerToUpdate.name = containerRequestDTO.name;
        containerToUpdate.description = containerRequestDTO.description;
        containerToUpdate.quantity = containerRequestDTO.quantity;
        const containerType = await this.containerTypeRepository.find( { where :{id: containerRequestDTO.typeId}})
        const userFound = await this.userRepository.findOne({where: {id: containerRequestDTO.userId}})
        containerToUpdate.type = containerType[0];
        containerToUpdate.user = userFound;
        const containerUpdated = await this.containerRepository.save(containerToUpdate);
        return new ContainerResponseDTO(containerUpdated.id, containerUpdated.name, containerUpdated.description, containerUpdated.quantity, containerUpdated.type.type, {id: containerUpdated.user.id, username: containerUpdated.user.username});
    }
    async delete(id: number): Promise<boolean> {
        const containerToDelete = await this.containerRepository.findOne({where: {id: id}});
        await this.containerRepository.remove(containerToDelete);
        return true;
    }

}

export const IContainerRepositoryToken = 'IContainerRepositoryToken';