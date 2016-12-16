import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from "./index/index.component";

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent, data: { title: '我要维修' } },
  { path: 'delivery', loadChildren: 'app/modules/delivery/delivery.module#DeliveryModule'},
  { path: 'home', loadChildren: 'app/modules/home/home.module#HomeModule'},
  { path: 'order', loadChildren: 'app/modules/order/order.module#OrderModule'},
  { path: '**', redirectTo: 'index' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
