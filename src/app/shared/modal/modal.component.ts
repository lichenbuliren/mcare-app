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
  Injector,
  ViewContainerRef,
  TemplateRef,
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

  isOpened: boolean = false;

  // =======================
  // 输入属性
  // =======================
  @Input() modalId: string;

  @Input() clazz: string;

  @Input() closeOnEscape: boolean = true;

  @Input() title: string = '标题';

  @Input() cancelButtonLabel: string = '取消';

  @Input() confirmButtonLabel: string = '确定';

  // =======================
  // 输出属性
  // =======================

  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  @Output() onConfirm: EventEmitter<any> = new EventEmitter(false);

  // =======================
  // 公共属性
  // =======================

  @ViewChild('modalRoot') modalRoot: ElementRef;

  // =======================
  // 私有属性
  // =======================

  @ViewChild('modalBody', {read: ViewContainerRef}) public dynamicTarget: ViewContainerRef;

  constructor(
    public injector: Injector,
    private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.modalService.registerModal(this);
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  private close() {
    this.isOpened = false;
    this.modalService.close();
  }

  cancel() {
    this.onCancel.emit();
    this.close();
  }

  confirm() {
    this.onConfirm.emit();
    this.modalService.confirm();
    this.close();
  }

  preventClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  keyup(event: KeyboardEvent) {
    if (event.keyCode === 27 && this.closeOnEscape) {
      this.isOpened = false;
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
      this.isOpened = false;
    }
  }
}
