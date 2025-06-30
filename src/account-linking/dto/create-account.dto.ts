export class CreateAccountDto {
    accountType: 'checking' | 'savings' | 'credit';
    bankName: string;
    accountNumber: string;
    syncFrequency?: 'daily' | 'weekly' | 'monthly';
  }
  