import {
  Injectable,
  ComponentRef,
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
  componentRef$ = new ReplaySubject<ComponentRef<any>>();

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
   */
  create<T>(module: any, component: any, params?: Object): Observable<ComponentRef<T>> {
    // 动态创建和编译一个 Module/Component
    this.compiler.compileModuleAndAllComponentsAsync(module).then(factory => {
      let componentFactory = factory.componentFactories.filter(item => item.componentType === component)[0];

      const childInjector = ReflectiveInjector.resolveAndCreate([], this.modal.injector);
      this.componentRef = this.modal.dynamicTarget.createComponent(componentFactory, 0, childInjector);

      // 给动态生成的组件赋值
      Object.assign(this.componentRef.instance, params);

      this.componentRef$.next(this.componentRef);
      // componentRef$.complete();
    });

    return this.componentRef$;
  }

  open<T>(module: any, component, opt?: Object): Observable<ComponentRef<T>> {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    // // 动态加载其它组件
    // let factory = this.componentFactoryResolver.resolveComponentFactory(component);
    // this.componentRef = this.modal.dynamicTarget.createComponent(factory);

    // // 设置属性
    // Object.assign(this.componentRef.instance, opt);
    this.modal.isOpened = true;

    return this.create<T>(module, component, opt);
  }

  close() {

  }

  confirm() {
    this.componentRef$.next(this.componentRef);
  }
}
