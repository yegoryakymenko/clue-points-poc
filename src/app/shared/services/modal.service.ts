import { ComponentRef, inject, Injectable, ViewContainerRef } from '@angular/core';
import { Modal } from '../../components/modal/modal';
import { ClientWithAccounts } from '../interfaces/account.interface';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private viewContainerRef: ViewContainerRef | null = null;
  private componentRef: ComponentRef<Modal> | null = null;

  openModal(selectedClient: ClientWithAccounts): void {
    if (this.viewContainerRef) {
      this.componentRef = this.viewContainerRef.createComponent(Modal);
      this.componentRef.setInput('selectedClient', selectedClient);
    }
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  closeModal(): void {
    this.componentRef?.destroy();
  }
}
