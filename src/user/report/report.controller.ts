import { Controller, Get, Query, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('download')
  async downloadReport(
    @Query('format') format: 'pdf' | 'csv',
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Res() res: Response
  ) {
    // Replace with actual data query
    const mockData = [
      { name: 'User A', income: 1000 },
      { name: 'User B', income: 1200 },
    ];

    if (format === 'csv') return this.reportService.exportCSV(mockData, res);
    else return this.reportService.exportPDF(mockData, res);
  }
}
