import { Component, computed, signal, inject, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { ClientWithAccounts } from './shared/interfaces/account.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpService } from './shared/services/http.service';
import { finalize } from 'rxjs';
import { ClientCard } from './components/client-card/client-card';
import { ModalService } from './shared/services/modal.service';

@Component({
  selector: 'app-root',
  imports: [
    ClientCard
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly httpService = inject(HttpService);
  private readonly modalService = inject(ModalService);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly clients = toSignal(this.httpService.getClientsList().pipe(finalize(() => this.loading.set(false))), {
    initialValue: []
  });
  private readonly accounts = toSignal(this.httpService.getAccountsList().pipe(finalize(() => this.loading.set(false))), {
    initialValue: []
  });
  readonly clientsWithAccounts = computed<ClientWithAccounts[]>(() => {
    return this.clients().map(client => ({
      client,
      accounts: this.accounts().filter(account =>
        client.accounts.includes(account.id)
      )
    }));
  });

  constructor() {
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
  }

  // UI state signals
  readonly searchTerm = signal<string>('');
  readonly loading = signal<boolean>(true);
  readonly filteredClients = computed(() => {
    const searchValue = this.searchTerm().toLowerCase().trim();
    if (!searchValue) {
      return this.clientsWithAccounts();
    }
    return this.clientsWithAccounts().filter(({ client }) => {
      return client.firstname?.toLowerCase()?.includes(searchValue)
    });
  });

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }
}
