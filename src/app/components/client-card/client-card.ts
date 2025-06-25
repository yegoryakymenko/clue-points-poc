import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  computed,
  linkedSignal
} from '@angular/core';
import { PieChart } from '../pie-chart/pie-chart';
import { ClientWithAccounts } from '../../shared/interfaces/account.interface';
import { DatePipe } from '@angular/common';
import { BarChart } from '../bar-chart/bar-chart';
import { PieFilter } from '../../shared/types/pie-lifter.type';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-client-card',
  imports: [
    PieChart,
    DatePipe,
    BarChart
  ],
  templateUrl: './client-card.html',
  styleUrl: './client-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientCard {
  private readonly modalService = inject(ModalService);
  readonly clientData = input.required<ClientWithAccounts>();

  readonly pieFilter = signal<PieFilter>(null);
  readonly currentPieClientId = signal<string | null>(null);

  readonly getUniqueAccountTypes = computed(() => [...new Set(this.clientData().accounts.map(account => account.card_type))])

  readonly accountTypeFilters = linkedSignal<string[]>(() => this.getUniqueAccountTypes());

  isAccountTypeVisible(accountType: string): boolean {
    return this.accountTypeFilters().includes(accountType);
  }

  toggleAccountType(accountType: string) {
    let currentFilters = [...this.accountTypeFilters()];
    if (!currentFilters.includes(accountType)) {
      currentFilters.push(accountType) ;
    } else {
     currentFilters = currentFilters.filter(val => val !== accountType)   ;
    }
    this.accountTypeFilters.set(currentFilters);
  }

  openAccountModal(clientData: ClientWithAccounts) {
    this.modalService.openModal(clientData);
  }
}
