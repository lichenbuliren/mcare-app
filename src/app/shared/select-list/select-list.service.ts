import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SelectList } from './select-list';
import { Observable, Observer } from 'rxjs';

export const mockHttpGet = (): Observable<Array<SelectList>> => {
  return Observable.create((observer: Observer<Array<SelectList>>) => {
    const timmer = setTimeout(() => {
      const result = [{
        id: 1,
        label: '维修',
        isSelected: false
      }, {
        id: 2,
        label: '换新',
        isSelected: false
      }];

      observer.next(result);
      observer.complete();
    }, Math.random()*1000 + 10);
  });
}

@Injectable()
export class SelectListService {

  listData: Array<SelectList>;
  // 选中项数组
  selected: Array<SelectList>;

  constructor() { }

  getListData(): Observable<Array<SelectList>> {
    return Observable.create((observer: Observer<Array<SelectList>>) => {
      if (this.listData) {
        observer.next(this.listData);
      } else {
        mockHttpGet().subscribe(data => {
          this.listData = data;
          observer.next(this.listData);
        });
      }
    });
  }
}
