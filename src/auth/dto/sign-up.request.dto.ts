import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequestDTO {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'user@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario (debe ser fuerte)',
        example: 'StrongP@ssw0rd!',
    })
    @IsStrongPassword()
    password: string;

    @ApiProperty({
        description: 'Nombre de usuario',
        example: 'john_doe',
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'URL de la imagen del perfil del usuario',
        example: 'https://example.com/images/profile.jpg',
    })
    @IsNotEmpty()
    thumbnail: string;
}
