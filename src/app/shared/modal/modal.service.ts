import {
  Injectable,
  ComponentRef,
  ComponentFactory,
  ComponentFactoryResolver,
  Component,
  ViewContainerRef,
  Compiler,
  ReflectiveInjector,
} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {

  // 弹层实例对象
  private modal: ModalComponent;
  private componentRef: ComponentRef<Component>;
  // private viewContainerRef: ViewContainerRef;
  componentRef$: ReplaySubject<ComponentRef<any>>;

  constructor(
    private compiler: Compiler,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  registerModal(newModal: ModalComponent): void {
    this.modal = newModal;
  }

  /**
   * module 模块名称， 比如 SharedModule
   * component 组件类型
   * params 参数
   * 动态编译模块，但是这样子做过不了 aot 打包模式
   */
  // create<T>(module: any, component: any, params?: Object): Observable<ComponentRef<T>> {
  //   this.componentRef$ = new ReplaySubject<ComponentRef<any>>();
  //   if (this.componentRef) {
  //     this.componentRef.destroy();
  //   }
  //   // 动态创建和编译一个 Module/Component
  //   this.compiler.compileModuleAndAllComponentsAsync(module).then(factory => {
  //     let componentFactory = factory.componentFactories.filter(item => item.componentType === component)[0];

  //     const childInjector = ReflectiveInjector.resolveAndCreate([], this.modal.injector);
  //     this.componentRef = this.modal.dynamicTarget.createComponent(componentFactory, 0, childInjector);
  //     // 给动态生成的组件赋值
  //     Object.assign(this.componentRef.instance, params);
  //     this.componentRef$.next(this.componentRef);
  //     this.modal.isOpened = true;
  //   });

  //   return this.componentRef$;
  // }

  open<T>(component: any, params?: Object): Observable<ComponentRef<T>> {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.componentRef$ = new ReplaySubject<ComponentRef<any>>();
    let factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = this.modal.dynamicTarget.createComponent(factory);
    Object.assign(this.componentRef.instance, params);
    this.componentRef$.next(this.componentRef);
    this.modal.isOpened = true;
    return this.componentRef$;
  }

  close() {
  }

  confirm() {
    this.componentRef$.next(this.componentRef);
    this.componentRef$.complete();
    this.componentRef$ = null;
  }
}
