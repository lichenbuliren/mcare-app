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

  listData: Array<SelectList>;
  selected: SelectList;
  // 默认显示类型
  @Input() default: SelectList;

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
      if (item.id === this.default.id && item.label === this.default.label) {
        item.isSelected = true;
        this.selected = item;
      }
    });
  }
}
