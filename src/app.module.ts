import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import getDatabaseProvider from './providers/database.provider';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseProvider,
    }),    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
