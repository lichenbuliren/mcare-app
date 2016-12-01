import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OrderComponent} from "./order.component";
import {OrderAddressComponent} from "./order-address/order-address.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {OrderVerifyComponent} from "./order-verify/order-verify.component";
import {OrderService} from "./order.service";

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: 'order',
      redirectTo: 'order/verify',
      pathMatch: 'full'
    }, {
      path: 'order/verify',
      component: OrderVerifyComponent,
    }, {
      path: 'order/address',
      canActivate: [OrderService],
      component: OrderAddressComponent,
    }, {
      path: 'order/detail',
      component: OrderDetailComponent
    }])
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule {
}
