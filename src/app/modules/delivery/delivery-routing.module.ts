import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeliveryVerifyComponent } from './delivery-verify/delivery-verify.component';
import { DeliverySubmitComponent } from './delivery-submit/delivery-submit.component';
import { DeliveryComponent } from "./delivery.component";

export const routes: Routes = [
  {
    path: '',
    component: DeliveryComponent,
    data: { title: '寄送快修' },
    children: [
      { path: 'verify', component: DeliveryVerifyComponent, data: { title: '基础信息' } },
      { path: 'submit', component: DeliverySubmitComponent, data: { title: '设备信息' } },
      { path: '', redirectTo: 'verify', pathMatch: 'full' },
      { path: '**', redirectTo: 'verify' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule {
}
