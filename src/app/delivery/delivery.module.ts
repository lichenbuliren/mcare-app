import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DeliveryRoutingModule} from './delivery-routing.module';
import {DeliveryVerifyComponent} from './delivery-verify/delivery-verify.component';
import {DeliveryDeviceComponent} from './delivery-device/delivery-device.component';
import {DeliveryComponent} from "./delivery.component";

@NgModule({
  imports: [
    CommonModule,
    DeliveryRoutingModule
  ],
  declarations: [DeliveryComponent, DeliveryVerifyComponent, DeliveryDeviceComponent]
})
export class DeliveryModule {
}
