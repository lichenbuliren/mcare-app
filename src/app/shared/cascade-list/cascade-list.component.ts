import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'cascade-list',
  templateUrl: './cascade-list.component.html',
  styleUrls: ['./cascade-list.component.scss']
})
export class CascadeListComponent implements OnInit {

  data: Array<any> = [];
  formateFn: Function;

  // 当前数据，以数组的形式表现，数组下表表示层级
  currentData: Array<any> = [];
  currentData$: Observable<Array<any>>;
  /**
   * data: 初始数据源，需要自己格式化为符合数据格式规范，或者传入一个格式化函数
   * 列表基础属性： id, name, children: {}, pid 父级 id, 当前层级 level
   * 在每次的选择回调中，对外暴露接口：供用户选择操作，比如这个时候可以动态的获取下级数据,并设置实例对象的数据
   * 用一个数组来表示当前展示的数据
   */

  constructor() {

  }

  ngOnInit() {
    console.log('init');
    this.generateData(17);
  }

  // 传递多级默认选中的 id 值, ids [17, 181] 代表一级广东省，二级深圳市
  private generateData(...ids) {
    // 一级列表默认数据父级 id 为 0，所以这里去 data[0][0];
    this.currentData[0] = this.data[0][0];
    for (var i = 0; i < ids.length; i++) {
      // 数据从第二项算起，第一项默认为全部数据
      this.currentData[i + 1] = this.data[i + 1][ids[i]];
    }

    console.log(this.currentData);
  }

  testAsync() {
    this.currentData$ = Observable.create(observer => {
      observer.next(this.currentData);
    })
  }

}
