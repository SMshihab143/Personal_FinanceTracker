import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule {}
