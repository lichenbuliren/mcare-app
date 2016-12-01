import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryVerifyComponent } from './delivery-verify/delivery-verify.component';
import { DeliverySubmitComponent } from './delivery-submit/delivery-submit.component';
import { DeliveryComponent } from "./delivery.component";

@NgModule({
  imports: [
    SharedModule,
    DeliveryRoutingModule
  ],
  declarations: [
    DeliveryComponent,
    DeliveryVerifyComponent,
    DeliverySubmitComponent
  ]
})
export class DeliveryModule {
}
