import { Component, OnInit, Input } from '@angular/core';
import { InputControlComponent } from "../../shared/input-control/input-control.component";

@Component({
  selector: 'delivery-verify',
  templateUrl: './delivery-verify.component.html',
  styleUrls: ['./delivery-verify.component.scss'],
  providers: [InputControlComponent]
})
export class DeliveryVerifyComponent implements OnInit {
  title = 'delivery verify works';
  username: string;
  mobile: string;
  color: string = 'green';

  constructor() {
    this.username = '魏如峰';
    this.mobile = '13602532846';
    console.log(this.username, this.mobile);
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.username, this.mobile);
  }

  // 监听子元素聚焦事件
  // onInputControlFocus() {
  //   console.log('child input-control focused');
  // }

  // 监听子元素值的变化
  // onInputChange(event) {
  //   // 由于这是双向绑定，所以这里看到的是一样的值，
  //   // 要看到不一样的值，可以在模板里面使用单项绑定
  //   console.log(`监听到子元素输入值变化：${this.username} => ${event}`);
  // }

}
