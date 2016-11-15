import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { HighlightDirective }  from './directives/';
import { InputControlComponent } from './input-control/input-control.component';
import { CountdownComponent } from './countdown/countdown.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [HighlightDirective, InputControlComponent, CountdownComponent],
  exports: [HighlightDirective, InputControlComponent, CountdownComponent, CommonModule, FormsModule]
})
export class SharedModule {
}
