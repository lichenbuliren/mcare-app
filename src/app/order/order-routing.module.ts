import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OrderComponent} from "./order.component";
import {OrderAddressComponent} from "./order-address/order-address.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {OrderVerifyComponent} from "./order-verify/order-verify.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'order',
        component: OrderComponent,
        children: [
          {path: '', component: OrderVerifyComponent},
          {path: 'address', component: OrderAddressComponent},
          {path: 'detail', component: OrderDetailComponent}
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule {
}
