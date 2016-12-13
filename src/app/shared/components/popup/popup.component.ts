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
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupComponent implements OnInit {

  // =======================
  // 输入属性
  // =======================

  @Input() isOpened = false;

  @Input() clazz: string;

  @Input() closeOnEscape: boolean = true;

  @Input() closeOnOutsideClick: boolean = true;

  @Input() title: string;

  @Input() cancelButtonLabel: string;

  @Input() submitButtonLabel: string;

  // =======================
  // 输出属性
  // =======================

  @Output() onOpen = new EventEmitter(false);

  @Output() onClose = new EventEmitter(false);

  @Output() onSubmit = new EventEmitter(false);

  @Output() isOpenedChange = new EventEmitter(false);

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
    this.createBackDrop();
  }

  ngOnDestroy() {
    if (this.backdropElement && this.backdropElement.parentNode === document.body) document.body.removeChild(this.backdropElement);

  }

  ngOnInit() {
  }

  // ngAfterViewInit() {
  //   let self = this;
  //   let factory = this.componentFactoryResolver.resolveComponentFactory(InputControlComponent);
  //   this.componentRef = this.dynamicTarget.createComponent(factory);
  // }


  open(...args: any[]) {
    if (this.isOpened) return;

    this.isOpened = true;
    this.isOpenedChange.emit(true);
    this.onOpen.emit(args);

    // TODO 这里可以动态插入其它组件
     document.body.appendChild(this.backdropElement);
     window.setTimeout(() => this.modalRoot.nativeElement.focus(), 0);
  }

  close(...args: any[]) {
    if (!this.isOpened) return;

    this.isOpened = false;
    this.isOpenedChange.emit(false);
    this.onClose.emit(args);
    document.body.removeChild(this.backdropElement);
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

  // 动态创建蒙层
  private createBackDrop() {
    this.backdropElement = document.createElement('div');
    this.backdropElement.classList.add('modal-mask');
    this.backdropElement.classList.add('fade');
    this.backdropElement.classList.add('in');
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
      console.log('out click');
      this.isOpened = false;
    }
  }
}
