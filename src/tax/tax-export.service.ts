import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { createObjectCsvStringifier } from 'csv-writer';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class TaxExportService {
  async exportCSV(transactions: any[], res: Response) {
    if (!transactions.length) {
      res.status(404).send('No data available to export.');
      return;
    }

    const csvStringifier = createObjectCsvStringifier({
      header: Object.keys(transactions[0]).map((key) => ({
        id: key,
        title: key.toUpperCase(),
      })),
    });

    const csvContent =
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(transactions);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=tax-report.csv');
    res.send(csvContent);
  }

  async exportPDF(transactions: any[], res: Response) {
    const doc = new PDFDocument({ margin: 30 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=tax-report.pdf');
    doc.pipe(res);

    doc.fontSize(18).text('Tax Deductible Transactions Report', { align: 'center' });
    doc.moveDown();

    transactions.forEach((tx, index) => {
      doc
        .fontSize(12)
        .text(
          `${index + 1}. Date: ${new Date(tx.date).toLocaleDateString()} | Amount: ৳${tx.amount} | Description: ${tx.description}`
        );
    });

    doc.end();
  }
}
