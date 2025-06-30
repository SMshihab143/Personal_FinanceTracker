import { Controller, Get, UseGuards } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from '../user/entity/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  getSummary(@GetUser() user: User) {
    return this.summaryService.getUserSummary(user.id);
  }
}
