import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryVerifyComponent } from './delivery-verify/delivery-verify.component';
import { DeliverySubmitComponent } from './delivery-submit/delivery-submit.component';
import { DeliveryComponent } from "./delivery.component";
import { HighlightDirective, InputControlComponent} from "../shared/";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DeliveryRoutingModule
  ],
  declarations: [
    HighlightDirective,
    DeliveryComponent,
    DeliveryVerifyComponent,
    DeliverySubmitComponent,
    InputControlComponent
  ]
})
export class DeliveryModule {
}
