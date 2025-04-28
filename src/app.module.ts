import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaycheckModule } from './paycheck/paycheck.module';
import { RecurringIncomeModule } from './recurring-income/recurring-income.module';
import { SideHustleModule } from './sidehustle/sidehustle.module';
import { PaycheckController } from './paycheck/paycheck.controller';
import { RecurringIncomeController } from './recurring-income/recurring-income.controller';
import { SideHustleController } from './sidehustle/sidehustle.controller';
import { PaycheckService } from './paycheck/paycheck.service';
import { RecurringIncomeService } from './recurring-income/recurring-income.service';
import { SideHustleService } from './sidehustle/sidehustle.service';
import { Paycheck } from './paycheck/paycheck.entity';
import { RecurringIncome } from './recurring-income/recurring-income.entity';
import { SideHustle } from './sidehustle/sidehustle.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345',
    database: 'finance_tracker',
    autoLoadEntities: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, 
    //dropSchema: true,// Turn off in production!
  }), PaycheckModule, RecurringIncomeModule, SideHustleModule,UserModule,
TypeOrmModule.forFeature([Paycheck]),
TypeOrmModule.forFeature([RecurringIncome]),
TypeOrmModule.forFeature([SideHustle]),
TypeOrmModule.forFeature([User]),
],

  controllers: [AppController,PaycheckController,RecurringIncomeController,SideHustleController],
  providers: [AppService,PaycheckService,RecurringIncomeService,SideHustleService],
})
export class AppModule {}
