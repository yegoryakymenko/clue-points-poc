import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { ClientWithAccounts } from '../../shared/interfaces/account.interface';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Modal {
  private readonly modalService = inject(ModalService);
  readonly selectedClient = input<ClientWithAccounts>()

  closeModal() {
    this.modalService.closeModal()
  }
}
