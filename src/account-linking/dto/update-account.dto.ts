export class UpdateAccountDto {
    syncFrequency?: 'daily' | 'weekly' | 'monthly';
    syncStatus?: 'synced' | 'error' | 'pending';
    errorMessage?: string;
  }
  