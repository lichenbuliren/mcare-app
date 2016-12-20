import { Injectable, ComponentRef, ComponentFactoryResolver, Component, ViewContainerRef } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {

  // 弹层实例对象
  private modal: ModalComponent;
  private componentRef: ComponentRef<Component>;
  private viewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  registerModal(newModal: ModalComponent): void {
    this.modal = newModal;
  }

  // create<T>(module: any, component: any, params?: Object): Observable<ComponentRef<T>> {
  //   let componentRef$ = new ReplaySubject();
  // }

  open(component, opt?: Object): ModalComponent {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    // 动态加载其它组件
    let factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = this.modal.dynamicTarget.createComponent(factory);
    this.modal.isOpened = true;
    return this.modal;
  }

  close(): void {
    this.modal.isOpened = false;
  }
}
