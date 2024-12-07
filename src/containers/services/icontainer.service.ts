import { ContainerRequestDTO } from "../dto/container.request.dto";
import { ContainerResponseDTO } from "../dto/container.response.dto";

export interface IContainerService{
    create(containerRequestDTO: ContainerRequestDTO) : Promise<ContainerResponseDTO>;
    findAll() : Promise<ContainerResponseDTO[]>;
    findByType(type: string) : Promise<ContainerResponseDTO[]>;
    findByUserId(userId: number) : Promise<ContainerResponseDTO[]>;
    update(id: number, containerRequestDTO: ContainerRequestDTO) : Promise<ContainerResponseDTO>;
    delete(id: number) : Promise<boolean>;
}