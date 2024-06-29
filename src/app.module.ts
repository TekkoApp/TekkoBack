import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import getDatabaseProvider from './providers/database.provider';
import { ConfigModule } from '@nestjs/config';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { LocationModule } from './modules/location/location.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ServiceModule } from './modules/service/service.module';
import { AssistantModule } from './modules/assistant/assistant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseProvider,
    }),    UserModule,
    AuthModule,
    DeliveryModule,
    LocationModule,
    SupplierModule,
    AssistantModule,
    ServiceModule
  ]
})
export class AppModule {}
