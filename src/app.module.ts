import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDatabase } from 'typeorm-extension';
import { User } from './auth/models/user.model';
import { UserRole } from './auth/models/user_role';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
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
      useFactory: async () => {
        await createDatabase({
          ifNotExist: true,
          options: {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '12345678',
            database: 'controlManagementDb',
          },
        });

        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '12345678',
          database: 'controlManagementDb',
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
