import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeliveryVerifyComponent } from './delivery-verify/delivery-verify.component';
import { DeliverySubmitComponent } from './delivery-submit/delivery-submit.component';
import { DeliveryComponent } from "./delivery.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'delivery',
        component: DeliveryComponent,
        data: { title: '寄送快修' },
        children: [
          { path: 'verify', component: DeliveryVerifyComponent, data: { title: '基础信息' } },
          { path: 'submit', component: DeliverySubmitComponent, data: { title: '设备信息' } },
          { path: '', redirectTo: 'verify' },
          { path: '**', redirectTo: 'verify' }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class DeliveryRoutingModule {
}
