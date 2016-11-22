import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from './directives/';
import { InputControlComponent } from './components/input-control/input-control.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { ValidatorsService } from './services/validators.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [HighlightDirective, InputControlComponent, CountdownComponent],
  providers: [ValidatorsService],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, HighlightDirective, InputControlComponent, CountdownComponent]
})
export class SharedModule {
}
