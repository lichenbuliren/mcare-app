import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HighlightDirective } from './directives/';
import { InputControlComponent } from './components/input-control/input-control.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { VerifyFormComponent } from './components/verify-form/verify-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PopupComponent } from './components/popup/popup.component';

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
    PopupComponent
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
    PopupComponent
  ]
})
export class SharedModule {
}
