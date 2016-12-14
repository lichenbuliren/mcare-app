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

// import { InputControlComponent } from '../input-control/input-control.component';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, AfterViewInit {

  // =======================
  // 输入属性
  // =======================
  private _isOpened = false;

  @Input()
  set isOpened(value) {
    this._isOpened = value;
    this.isOpenedChange.emit(value);
  }
  get isOpened() {
    return this._isOpened;
  }

  @Input() clazz: string;

  @Input() closeOnEscape: boolean = true;

  @Input() closeOnOutsideClick: boolean = true;

  @Input() title: string = '标题';

  @Input() cancelButtonLabel: string;

  @Input() submitButtonLabel: string;

  // =======================
  // 输出属性
  // =======================

  @Output() onOpen = new EventEmitter(false);

  @Output() onClose = new EventEmitter(false);

  @Output() onSubmit = new EventEmitter(false);

  @Output() isOpenedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // =======================
  // 公共属性
  // =======================

  @ViewChild('modalRoot') public modalRoot: ElementRef;

  // =======================
  // 私有属性
  // =======================
  private backdropElement: HTMLElement;

  componentRef: ComponentRef<Component>
  @ViewChild('modalBody', {read: ViewContainerRef}) dynamicTarget: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnDestroy() {
  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    // let factory = this.componentFactoryResolver.resolveComponentFactory();
    // this.componentRef = this.dynamicTarget.createComponent(factory);
  }


  open(...args: any[]) {
    if (this._isOpened) return;

    this._isOpened = true;
    // this.isOpenedChange.emit(true);
    this.onOpen.emit(args);

    // TODO 这里可以动态插入其它组件
  }

  close(...args: any[]) {
    if (!this._isOpened) return;

    this._isOpened = false;
    // this.isOpenedChange.emit(false);
    this.onClose.emit(args);
  }

  submit() {
    this.onSubmit.emit({
      province: '广东',
      city: '深圳'
    });

    this.close();
  }

  public preventClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  // 点击弹层主区域之外，关闭弹层
  @HostListener('window:click', ['$event'])
  handleClose(event) {
    var parent = event.target;
    // 如何当前节点不是宿主节点，并且不等于 document 节点
    while (parent && this.modalRoot && parent != this.modalRoot.nativeElement && parent != document) {
      // 取当前节点的父节点继续寻找
      parent = parent.parentNode;
    }

    // 找到最顶层，则表示已经不在宿主元素内部了，触发失去焦点 fn
    if (parent == document) {
      this._isOpened = false;
    }
  }
}
