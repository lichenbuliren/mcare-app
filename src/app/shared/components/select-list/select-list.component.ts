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
    isActive: true
  }];

  constructor() { }

  ngOnInit() { }

  checked(event, item) {
    event.stopPropagation();

    this.mockData.forEach(item => {
      item.isActive = false;
    });

    item.isActive = true;

    // 对外暴露出选中的对象

  }

}
