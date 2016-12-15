import { Injectable } from '@angular/core';

import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {

  private modals: Array<ModalComponent>;

  constructor() {
    this.modals = [];
  }

  registerModal(newModal: ModalComponent): void {
    var modal = this.findModal(newModal.modalId);

    if (modal) {
      // 删除旧的
      this.modals.splice(this.modals.indexOf(modal));
    }

    this.modals.push(newModal);
  }

  open(modalId: string): void {
    var modal = this.findModal(modalId);

    if (!modal) return;

    modal.isOpened = true;
  }

  close(modalId: string): void {
    var modal = this.findModal(modalId);

    if (!modal) return;

    modal.isOpened = false;
  }

  private findModal(modalId: string): ModalComponent {
    console.log('total modals: ',this.modals.length);
    for(var modal of this.modals) {
      if (modal.modalId === modalId) {
        return modal;
      }
    }

    return null;
  }
}
