import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from "./home.component";
import { HomeVerifyComponent } from "./home-verify/home-verify.component";
import { HomeSubmitComponent } from "./home-submit/home-submit.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        data: { title: '上门快修' },
        children: [
          { path: 'verify', component: HomeVerifyComponent },
          { path: 'submit', component: HomeSubmitComponent },
          { path: '', redirectTo: 'verify', pathMatch: 'full' },
          { path: '**', redirectTo: 'verify' }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
