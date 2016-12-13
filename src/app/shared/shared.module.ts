import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HighlightDirective } from './directives/';
import { InputControlComponent } from './components/input-control/input-control.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { VerifyFormComponent } from './components/verify-form/verify-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';

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
    NavbarComponent,
    ModalComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightDirective,
    InputControlComponent,
    CountdownComponent,
    VerifyFormComponent,
    NavbarComponent,
    ModalComponent
  ],
  entryComponents: [InputControlComponent]
})
export class SharedModule {
}
