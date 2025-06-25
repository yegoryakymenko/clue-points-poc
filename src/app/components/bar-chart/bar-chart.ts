import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Account, ClientWithAccounts } from '../../shared/interfaces/account.interface';
import { PieFilter } from '../../shared/types/pie-lifter.type';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChart {
  readonly clientData = input.required<ClientWithAccounts>();
  readonly accountTypeFilters = input.required<string[]>();
  readonly pieFilter = input.required<PieFilter>();
  readonly currentPieClientId = input.required<string | null>();

  readonly openModal = output<ClientWithAccounts>();

  readonly accountTotalBalance = computed(() => this.getVisibleAccounts().reduce((prev, curr) => prev + curr.balance, 0));


//computed
  getVisibleAccounts = computed<Account[]>(() => {
    const clientData = this.clientData();
    let visibleAccounts = clientData.accounts.filter(({ card_type }) =>
      this.accountTypeFilters().includes(card_type)
    );

    // Apply pie filter if active for this client
    const currentPieFilter = this.pieFilter();
    const currentClientId = this.currentPieClientId();

    if (currentPieFilter && currentClientId === clientData.client.id) {
      visibleAccounts = visibleAccounts.filter(account =>
        currentPieFilter === 'positive' ? account.balance >= 0 : account.balance < 0
      );
    }

    return visibleAccounts;
  })

  getBarHeight(balance: number, allAccounts: Account[]): number {
    const maxBalance = Math.max(...allAccounts.map(a => Math.abs(a.balance)));
    const minHeight = 10;
    const maxHeight = 80;
    return minHeight + (Math.abs(balance) / maxBalance) * (maxHeight - minHeight);
  }
}
