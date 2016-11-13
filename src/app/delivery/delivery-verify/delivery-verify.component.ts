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

  constructor() {
  }

  ngOnInit() {
  }

}
