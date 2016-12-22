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

  @Input() selected;

  constructor() { }

  ngOnInit() {
    console.log(this.selected);
  }

  checked(event, item) {
    event.stopPropagation();

    this.mockData.forEach(item => {
      item.isActive = false;
    });

    item.isActive = true;
    this.selected = item;
  }

}
