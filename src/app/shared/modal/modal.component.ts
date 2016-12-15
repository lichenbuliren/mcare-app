import {
  Component,
  ComponentRef,
  OnInit,
  Input,
  Output,
  ViewEncapsulation,
  HostListener,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';

import { ModalService } from './modal.service';

@Component({
  selector: 'mcare-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  host: {
    '(document:keyup)': 'keyup($event)',
    '(document:click)': 'handOutSideClick($event)'
  },
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, AfterViewInit {

  // =======================
  // 输入属性
  // =======================
  @Input() modalId: string = +new Date() + '';

  @Input() isOpened: boolean = false;

  @Input() clazz: string;

  @Input() closeOnEscape: boolean = true;

  @Input() title: string = '标题';

  @Input() cancelButtonLabel: string = '取消';

  @Input() confirmButtonLabel: string = '确定';

  // =======================
  // 输出属性
  // =======================

  @Output() onOpen: EventEmitter<any> = new EventEmitter(false);

  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  @Output() onConfirm: EventEmitter<any> = new EventEmitter(false);

  @Output() isOpenedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // =======================
  // 公共属性
  // =======================

  @ViewChild('modalRoot') public modalRoot: ElementRef;

  // =======================
  // 私有属性
  // =======================
  componentRef: ComponentRef<Component>

  @ViewChild('modalBody', {read: ViewContainerRef}) dynamicTarget: ViewContainerRef;

  constructor(
    private modalService: ModalService,
    private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    this.modalService.registerModal(this);
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    // let factory = this.componentFactoryResolver.resolveComponentFactory();
    // this.componentRef = this.dynamicTarget.createComponent(factory);
  }

  cancel() {
    this.onCancel.emit();
    this.close();
  }

  open(...args: any[]) {
    if (this.isOpened) return;

    this.isOpened = true;
    this.isOpenedChange.emit(true);
    this.onOpen.emit(args);

    // TODO 这里可以动态插入其它组件
  }

  private close(...args: any[]) {
    this.modalService.close(this.modalId);
  }

  confirm() {
    this.onConfirm.emit({
      province: '广东',
      city: '深圳'
    });

    this.close();
  }

  preventClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  keyup(event: KeyboardEvent) {
    if (event.keyCode === 27 && this.closeOnEscape) {
      this.close();
    }
  }

  // 点击弹层主区域之外，关闭弹层
  handOutSideClick(event) {
    var parent = event.target;
    // 如何当前节点不是宿主节点，并且不等于 document 节点
    while (parent && this.modalRoot && parent != this.modalRoot.nativeElement && parent != document) {
      // 取当前节点的父节点继续寻找
      parent = parent.parentNode;
    }

    // 找到最顶层，则表示已经不在宿主元素内部了，触发失去焦点 fn
    if (parent == document) {
      this.close();
    }
  }
}
