import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DeliveryComponent} from "./delivery/delivery.component";
import {OrderComponent} from "./order/order.component";
import {IndexComponent} from "./index/index.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'delivery', component: DeliveryComponent },
      { path: 'order', component: OrderComponent},
      { path: 'home', component: HomeComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
