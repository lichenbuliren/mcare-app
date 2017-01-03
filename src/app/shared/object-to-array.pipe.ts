import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  keys = [];

  transform(value: any, args?: any): any {
    if (Object.prototype.toString.call(value) !== '[object object]') {
      throw new Error('输入值不是对象类型');
    }
    this.keys = Object.keys(value);

    return this.keys;
  }

}
