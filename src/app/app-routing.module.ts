import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { IndexComponent } from "./index/index.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: IndexComponent, data: { title: '我要维修' } },
      { path: 'delivery', loadChildren: 'app/modules/delivery.module#DeliveryModule'},
      { path: 'home', loadChildren: 'app/modules/home.module#HomeModule'},
      { path: 'order', loadChildren: 'app/modules/order.module#OrderModule'},
      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
