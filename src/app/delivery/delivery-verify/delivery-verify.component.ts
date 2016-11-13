import {Component, OnInit, Input} from '@angular/core';
import {InputControlComponent} from "../../shared/input-control/input-control.component";

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

  constructor() {
    this.username = '魏如峰';
    this.mobile = '13602532846';
    console.log(this.username, this.mobile);
  }

  ngOnInit() {
  }

  onInputControlFocus() {
    console.log('child input-control focused');
  }

}
