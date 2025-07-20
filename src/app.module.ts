import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDatabase } from 'typeorm-extension';
import { User } from './auth/models/user.model';
import { UserRole } from './auth/models/user_role';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContainersModule } from './containers/containers.module';
import { Container } from './containers/models/container.model';
import { ContainerType } from './containers/models/container_type';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        await createDatabase({
          ifNotExist: true,
          options: {
            type: 'mysql',
            host: configService.get<string>('MYSQL_HOST'),
            port: parseInt(configService.get<string>('MYSQL_PORT'), 10),
            username: configService.get<string>('MYSQL_USER'),
            password: configService.get<string>('MYSQL_PASSWORD'),
            database: configService.get<string>('MYSQL_DATABASE'),
            entities: [User, UserRole, Container, ContainerType],
          },
        });

        return {
          type: 'mysql',
          host: configService.get<string>('MYSQL_HOST'),
          port: parseInt(configService.get<string>('MYSQL_PORT'), 10),
          username: configService.get<string>('MYSQL_USER'),
          password: configService.get<string>('MYSQL_PASSWORD'),
          database: configService.get<string>('MYSQL_DATABASE'),
          entities: [User, UserRole, Container, ContainerType],
        };
      },
    }),
    AuthModule,
    ContainersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
