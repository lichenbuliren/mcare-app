import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HighlightDirective } from './directives/';
import { InputControlComponent } from './components/input-control/input-control.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { VerifyFormComponent } from './components/verify-form/verify-form.component';
import { ModalComponent, ModalService } from './modal/';
import { SelectControlComponent } from './components/select-control/select-control.component';
import { SelectListComponent } from './components/select-list/select-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HighlightDirective,
    InputControlComponent,
    CountdownComponent,
    VerifyFormComponent,
    ModalComponent,
    SelectControlComponent,
    SelectListComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightDirective,
    InputControlComponent,
    CountdownComponent,
    VerifyFormComponent,
    ModalComponent,
    SelectControlComponent,
    SelectListComponent
  ],
  providers: [ModalService],
  entryComponents: [SelectListComponent]
})
export class SharedModule {
}
