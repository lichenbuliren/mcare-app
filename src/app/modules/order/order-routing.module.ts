import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderComponent } from "./order.component";
import { OrderAddressComponent } from "./order-address/order-address.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderVerifyComponent } from "./order-verify/order-verify.component";
import { OrderService } from "./order.service";

export const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    data: { title: '预约快修' },
    children: [
      { path: 'verify', component: OrderVerifyComponent, data: { title: '基础信息' } },
      { path: 'address', component: OrderAddressComponent, data: { title: '地址信息' } },
      { path: 'detail', component: OrderDetailComponent, data: { title: '维修信息' } },
      { path: '', redirectTo: 'verify', pathMatch: 'full' },
      { path: '**', redirectTo: 'verify' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
