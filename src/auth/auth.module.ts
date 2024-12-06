import { Module } from '@nestjs/common';
import { AuthRepository, IAuthRepositoryToken } from './repositories/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UserRole } from './models/user_role';
import { AuthService, IAuthServiceToken } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RoleSeederService } from './services/seed-roles.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    controllers:[AuthController],
    imports: [
        TypeOrmModule.forFeature([User, UserRole]),
        ConfigModule.forRoot(), 
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_SECRET'),
              signOptions: { 
                expiresIn: process.env.EXPIRES_IN
            },
            }),
            inject: [ConfigService],
          }),
          
    ],
    providers:[
        {
            provide: IAuthRepositoryToken,
            useClass: AuthRepository
        },
        {
            provide: IAuthServiceToken,
            useClass: AuthService
        },
        RoleSeederService
    ],
    exports:[IAuthRepositoryToken, IAuthServiceToken]
})
export class AuthModule {}
