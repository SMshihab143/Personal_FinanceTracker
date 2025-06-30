import { Injectable } from '@nestjs/common';
import { createObjectCsvStringifier } from 'csv-writer';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class ReportService {
  async exportCSV(data: any[], res: Response) {
    const csvStringifier = createObjectCsvStringifier({
      header: Object.keys(data[0] || {}).map(key => ({ id: key, title: key })),
    });

    const csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
    res.send(csv);
  }

  async exportPDF(data: any[], res: Response) {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    doc.pipe(res);

    data.forEach((item, index) => {
      doc.text(`${index + 1}. ${JSON.stringify(item)}`);
    });

    doc.end();
  }
}
