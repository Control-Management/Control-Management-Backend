import { ApiProperty } from "@nestjs/swagger";

export class SignInRequestDTO{
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'user@example.com',
    })
    email: string;
    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'StrongP@ssw0rd!',
    })
    password: string;
    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }
}