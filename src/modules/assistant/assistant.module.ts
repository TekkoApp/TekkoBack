import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assistant } from './assistant.entity';
import { AssistantService } from './assistant.service';
import { AssistantController } from './assistant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Assistant])],
  providers: [AssistantService],
  controllers: [AssistantController],
  exports: [AssistantService],
})
export class AssistantModule {}
