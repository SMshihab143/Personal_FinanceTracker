// src/account-linking/dto/connect-account.dto.ts
export class ConnectAccountDto {
    bankName: string;
    accountType: 'checking' | 'savings' | 'credit';
  }
  