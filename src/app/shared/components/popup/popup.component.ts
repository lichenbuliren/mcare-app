import { Component, OnInit, Input, ViewEncapsulation, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupComponent implements OnInit {
  title = '标题';
  btnLen: number;

  // 弹层主区域
  @ViewChild('modalDialog') modalDialog: ElementRef;

  @Input() buttons = {
    cancel: '取消',
    primary: '确定'
  };

  @Input() show: boolean = true;

  constructor() { }

  ngOnInit() {
    this.btnLen = Object.keys(this.buttons).length;
    console.log(this.btnLen);
  }

  // 点击弹层主区域之外，关闭弹层
  @HostListener('window:click', ['$event'])
  handleClose(event) {
    var parent = event.target;
    // 如何当前节点不是宿主节点，并且不等于 document 节点
    while (parent && this.modalDialog && parent != this.modalDialog.nativeElement && parent != document) {
      // 取当前节点的父节点继续寻找
      parent = parent.parentNode;
    }

    // 找到最顶层，则表示已经不在宿主元素内部了，触发失去焦点 fn
    if (parent == document) {
      console.log('out click');
      this.show = false;
    }
  }

  close() {
    this.show = false;
  }

  _handleCancel() {
    console.log('取消操作');
    this.close();
  }

  _handlePrimary() {
    console.log('确认操作');
    this.close();
  }
}
