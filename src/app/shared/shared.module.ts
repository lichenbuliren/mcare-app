import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from './directives/';
import { InputControlComponent } from './components/input-control/input-control.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { VerifyFormComponent } from './components/verify-form/verify-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [HighlightDirective, InputControlComponent, CountdownComponent, VerifyFormComponent],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, HighlightDirective, InputControlComponent, CountdownComponent, VerifyFormComponent]
})
export class SharedModule {
}
