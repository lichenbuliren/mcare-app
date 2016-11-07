import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderAddressComponent } from './order-address/order-address.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {OrderRoutingModule} from "./order-routing.module";
import { OrderVerifyComponent } from './order-verify/order-verify.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule
  ],
  declarations: [OrderComponent, OrderAddressComponent, OrderDetailComponent, OrderVerifyComponent]
})
export class OrderModule { }
