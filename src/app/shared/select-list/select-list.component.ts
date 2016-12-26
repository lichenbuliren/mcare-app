import { Component, OnInit, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { SelectListService } from './select-list.service';
import { SelectList } from './select-list';

@Component({
  selector: 'select-list',
  styleUrls: ['select-list.component.scss'],
  templateUrl: 'select-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SelectListComponent implements OnInit, AfterViewInit {
  private _multiple: boolean = false;

  listData: Array<SelectList> = [];
  selected: Array<SelectList> = [];
  // 默认显示类型
  @Input() default: Array<SelectList> = [];

  @Input()
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    this._multiple = this._coerceBooleanProperty(value);
  }

  constructor(private selectListService: SelectListService) {
  }

  ngOnInit() {
    this.selectListService.getListData().subscribe(data => {
      this.listData = data;
      this.setCurrent();
    });

    console.log('mutiple ? ', this._multiple);
  }

  ngAfterViewInit() {
    // console.log('mutiple ? ', this._multiple);
  }

  // 点击事件
  checked(event, clickItem) {
    event.stopPropagation();

    // 至少保留一项选中项
    if (this.selected.length === 1 && clickItem.id === this.selected[0].id) return;

    // 单选操作
    if (!this._multiple) {
      this.selected.length = 0;
      this.listData.forEach(item => {
        item.isSelected = false;
      });
    }

    // 判断是否取消选中
    if (clickItem.isSelected) {
      console.log(this.selected.indexOf(clickItem));
      this.selected.splice(this.selected.indexOf(clickItem), 1);
    } else {
      this.selected.push(clickItem);
    }

    clickItem.isSelected = !clickItem.isSelected;
  }

  // 设置当前已经选中的项
  setCurrent() {
    this.listData.forEach(item => {
      let activeItem = [];
      // 如果是单选，则传递的参数取数组第一项
      if (!this._multiple) {
        // 单选
        activeItem.push(this.default[0]);
      } else {
        activeItem = this.default;
      }

      activeItem.forEach((actived) => {
        if (item.id === actived.id || item.label === actived.label) {
          item.isSelected = true;
          this.selected.push(item);
        }
      });
    });
  }

  private _coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
  }
}
