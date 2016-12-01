import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IndexComponent } from "./index/index.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: IndexComponent, data: { title: '我要维修' } },
      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
