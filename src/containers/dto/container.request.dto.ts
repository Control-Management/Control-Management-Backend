import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class ContainerRequestDTO{
    @ApiProperty({
        description: 'Nombre del contenido',
        example: 'Contenido 1',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({
        description: 'Descripción del contenido',
        example: 'Contenido de ejemplo',
    })
    @IsString()
    @IsNotEmpty()
    description: string;
    @ApiProperty({
        description: 'Cantidad del contenido',
        example: 10,
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;
    @ApiProperty({
        description: 'ID del tipo de contenido',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    typeId: number;
    @ApiProperty({
        description: 'ID del usuario que creó el contenido',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    userId: number;
}