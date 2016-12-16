import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { OrderRoutingModule } from "./order-routing.module";
import { OrderComponent } from './order.component';
import { OrderAddressComponent } from './order-address/order-address.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderVerifyComponent } from './order-verify/order-verify.component';

@NgModule({
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
  declarations: [
    OrderComponent,
    OrderAddressComponent,
    OrderDetailComponent,
    OrderVerifyComponent
  ]
})
export class OrderModule {
}
