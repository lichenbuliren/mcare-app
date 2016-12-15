import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { IndexComponent } from "./index/index.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: IndexComponent, data: { title: '我要维修' } },
      { path: 'delivery', loadChildren: 'app/modules/delivery/delivery.module#DeliveryModule'},
      { path: 'home', loadChildren: 'app/modules/home/home.module#HomeModule'},
      { path: 'order', loadChildren: 'app/modules/home/order.module#OrderModule'},
      { path: '**', redirectTo: 'index' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
