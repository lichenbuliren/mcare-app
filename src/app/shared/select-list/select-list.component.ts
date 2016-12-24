import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SelectListService } from './select-list.service';
import { SelectList } from './select-list';

@Component({
  selector: 'select-list',
  styleUrls: ['select-list.component.scss'],
  templateUrl: 'select-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SelectListComponent implements OnInit {
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
  }

  checked(event, item) {
    event.stopPropagation();
    this.listData.forEach(item => {
      item.isSelected = false;
    });

    item.isSelected = true;
    this.selected = item;
  }

  setCurrent() {
    this.listData.forEach(item => {
      this.default.forEach((selected) => {
        this.setSelected(item, selected);
      });
    });
  }

  private setSelected(item: SelectList, defaultItem: SelectList) {
    if (item.id === defaultItem.id || item.label === defaultItem.label) {
      item.isSelected = true;
      this.selected.push(item);
    }
  }

  private _coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
  }
}
