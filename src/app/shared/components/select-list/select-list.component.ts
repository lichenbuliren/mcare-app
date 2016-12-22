import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'select-list',
  styleUrls: ['select-list.component.scss'],
  templateUrl: 'select-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SelectListComponent implements OnInit {

  mockData = [{
    label: '维修',
    val: 1,
    isActive: false
  },{
    label: '换新',
    val: 2,
    isActive: false
  }];

  selected;

  // 默认显示类型
  @Input() label;

  constructor() {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('on init');
    this.setCurrent();
  }

  checked(event, item) {
    event.stopPropagation();

    this.mockData.forEach(item => {
      item.isActive = false;
    });

    item.isActive = true;
    this.selected = item;
  }

  setCurrent() {
    this.mockData.forEach(item => {
      if (item.label == this.label) {
        this.selected = item;
      }
    });
  }
}
