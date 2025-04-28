import { Module } from '@nestjs/common';
import { PaycheckService } from './paycheck.service';
import { PaycheckController } from './paycheck.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paycheck } from './paycheck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paycheck])],
  controllers: [PaycheckController],
  providers: [PaycheckService],
})
export class PaycheckModule {}
