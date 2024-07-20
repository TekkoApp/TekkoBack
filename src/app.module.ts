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
import AWSResourceModule from './modules/aws/awsResourse.module';
import { MailerSendModule } from './modules/mailerSend/mailerSend.module';
import { EventMailModule } from './modules/event-mail/event-mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientModule } from './modules/client/client.module';
import { ZoneModule } from './modules/zone/zone.module';
import { TimeSheetModule } from './modules/timeSheet/timeSheet.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseProvider,
    }),    UserModule,
    AuthModule,
    ClientModule,
    DeliveryModule,
    LocationModule,
    SupplierModule,
    AssistantModule,
    ServiceModule,
    AWSResourceModule,
    ZoneModule,
    MailerSendModule,
    EventMailModule,
    TimeSheetModule
  ]
})
export class AppModule {}
