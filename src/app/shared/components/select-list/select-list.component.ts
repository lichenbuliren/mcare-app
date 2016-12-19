import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'select-list',
  templateUrl: 'select-list.component.html'
})
export class SelectListComponent implements OnInit {

  mockData = [{
    label: '维修',
    val: 1
  },{
    lable: '换新',
    val: 2
  }];

  constructor() { }

  ngOnInit() { }

}
