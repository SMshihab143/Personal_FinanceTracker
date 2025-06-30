import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './income.entity';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Income]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [IncomeController],
  providers: [IncomeService],
  exports: [IncomeService],
})
export class IncomeModule {}
