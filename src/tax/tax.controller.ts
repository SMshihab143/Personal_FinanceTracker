import {
  Controller,
  Get,
  Query,
  UseGuards,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from '../user/entity/user.entity';
import { TaxService } from './tax.service';
import { TaxExportService } from './tax-export.service'; // ✅ make sure this matches your file
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('tax')
export class TaxController {
  constructor(
    private readonly taxService: TaxService,
    private readonly exportService: TaxExportService, // ✅ inject export service
  ) {}

  @Get('report')
  generateTaxReport(
    @GetUser() user: User,
    @Query('year') year: number,
    @Query('quarter') quarter: number,
  ) {
    return this.taxService.generateTaxReport(user.id, year, quarter);
  }

  @Get('export')
  async exportTaxData(
    @GetUser() user: User,
    @Query('year') year: number,
    @Query('quarter') quarter: number,
    @Query('format') format: 'csv' | 'pdf',
    @Res() res: Response,
  ) {
    const data = await this.taxService.generateTaxReport(user.id, year, quarter);

    if (format === 'csv') {
      return this.exportService.exportCSV(data.transactions, res);
    } else {
      return this.exportService.exportPDF(data.transactions, res);
    }
  }
}
