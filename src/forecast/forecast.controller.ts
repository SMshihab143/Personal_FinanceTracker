import { Controller, Get, UseGuards } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from '../user/entity/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('forecast')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  @Get()
  forecast(@GetUser() user: User) {
    return this.forecastService.forecastCashFlow(user.id);
  }
}
