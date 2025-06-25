import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Account, ClientWithAccounts } from '../../shared/interfaces/account.interface';
import { PieFilter } from '../../shared/types/pie-lifter.type';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChart {
  readonly clientData = input.required<ClientWithAccounts>();
  readonly pieFilerOut = output<PieFilter>();
  readonly currentPieClientIdOut = output<string | null>();
  readonly pieFilter = signal<PieFilter>(null);
  readonly currentPieClientId = signal<string | null>(null);

  getPieSliceSize(accounts: Account[], isPositive: boolean): number {
    const filteredAccounts = accounts.filter(account =>
      isPositive ? account.balance >= 0 : account.balance < 0
    );
    const percentage = accounts.length > 0 ? filteredAccounts.length / accounts.length : 0;
    return percentage * 314;
  }

  getPositiveAccountsCount(accounts: Account[]): number {
    return accounts.filter(account => account.balance >= 0).length;
  }

  getNegativeAccountsCount(accounts: Account[]): number {
    return accounts.filter(account => account.balance < 0).length;
  }

  togglePieFilter(filter: 'positive' | 'negative', clientId: string) {
    const currentFilter = this.pieFilter();
    const currentClientId = this.currentPieClientId();

    if (currentFilter === filter && currentClientId === clientId) {
      this.pieFilter.set(null);
      this.currentPieClientId.set(null);
      this.pieFilerOut.emit(null);
      this.currentPieClientIdOut.emit(null);
    } else {
      this.pieFilter.set(filter);
      this.currentPieClientId.set(clientId);
      this.pieFilerOut.emit(filter);
      this.currentPieClientIdOut.emit(clientId);
    }
  }
}
