/**
 * 单例模式使用
 * 用来记录多个步骤之间的数据共享操作
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Service {

  private _session = {};

  constructor() { }

  set(key: string, value: any) {
    this._session[key] = value;
  }

  get(key: string) {
    return this._session[key];
  }

  has(key: string) {
    if (this.get(key)) return true;
    return false;
  }

  remove(key: string) {
    this._session[key] = null;
  }

}
