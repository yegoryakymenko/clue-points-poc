import { Client } from './client.interface';

export interface Account {
  balance: number;
  card_type: string;
  created: string;
  id: string;
  number: number;
}

export interface ClientWithAccounts {
  client: Client;
  accounts: Account[];
}
