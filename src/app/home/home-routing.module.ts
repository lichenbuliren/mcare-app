import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

import {HomeComponent} from "./home.component";
import {HomeVerifyComponent} from "./home-verify/home-verify.component";
import {HomeSubmitComponent} from "./home-submit/home-submit.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
        children: [
          {path: '', component: HomeVerifyComponent},
          {path: 'verify', component: HomeVerifyComponent},
          {path: 'submit', component: HomeSubmitComponent}
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
