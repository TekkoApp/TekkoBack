import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TimeSheet from './timeSheet.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TimeSheet])],
})
export class TimeSheetModule {}
