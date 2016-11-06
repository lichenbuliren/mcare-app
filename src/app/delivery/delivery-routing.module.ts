import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

import {DeliveryVerifyComponent} from './delivery-verify/delivery-verify.component';
import {DeliveryDeviceComponent} from './delivery-device/delivery-device.component';
import {DeliveryComponent} from "./delivery.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'delivery',
        component: DeliveryComponent,
        children: [
          {path: '', component: DeliveryVerifyComponent},
          {path: 'verify', component: DeliveryVerifyComponent},
          {path: 'device', component: DeliveryDeviceComponent}
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class DeliveryRoutingModule {
}
