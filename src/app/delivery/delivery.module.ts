import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {DeliveryRoutingModule} from './delivery-routing.module';
import {DeliveryVerifyComponent} from './delivery-verify/delivery-verify.component';
import {DeliverySubmitComponent} from './delivery-submit/delivery-submit.component';
import {DeliveryComponent} from "./delivery.component";
import {InputControlComponent} from "../shared/input-control/input-control.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DeliveryRoutingModule
  ],
  declarations: [
    DeliveryComponent,
    DeliveryVerifyComponent,
    DeliverySubmitComponent,
    InputControlComponent
  ]
})
export class DeliveryModule {
}
