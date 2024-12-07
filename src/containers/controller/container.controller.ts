import { Body, Controller, Delete, Get, Inject, Post, Put, Query } from "@nestjs/common";
import { IContainerServiceToken } from "../services/container.service";
import { IContainerService } from "../services/icontainer.service";
import { ContainerRequestDTO } from "../dto/container.request.dto";

@Controller("api/v1/containers")
export class ContainerController{
    constructor(@Inject(IContainerServiceToken) private containerService: IContainerService) { }

    @Post()
    async createContainer(@Body() containerRequest: ContainerRequestDTO){
        return await this.containerService.create(containerRequest);

    }

    @Get()
    async getAllContainers(){
        return await this.containerService.findAll();
    }

    @Get(":userId")
    async getContainersByUserId(@Query("userId") userId: number){
        return await this.containerService.findByUserId(userId);
    }

    @Get(":type")
    async getContainersByType(@Query("type") type: string){
        return await this.containerService.findByType(type);
    }

    @Put(":id")
    async updateContainer(@Query("id") id: number, @Body() containerRequest: ContainerRequestDTO){
        return await this.containerService.update(id, containerRequest);
    }

    @Delete(":id")
    async deleteContainer(@Query("id") id: number){
        return await this.containerService.delete(id);
    }

}