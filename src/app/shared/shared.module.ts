import { NgModule, Optional, SkipSelf, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HighlightDirective } from './directives/';
import { InputControlComponent } from './components/input-control/input-control.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { VerifyFormComponent } from './components/verify-form/verify-form.component';
import { ModalComponent, ModalService } from './modal/';
import { SelectControlComponent } from './select-control/select-control.component';
import { SelectListComponent, SelectListService } from './select-list/';
import { BubbleComponent } from './bubble/bubble.component';
import { CascadeListComponent } from './cascade-list/cascade-list.component';
import { ObjectToArrayPipe } from './object-to-array.pipe';

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
    SelectListComponent,
    BubbleComponent,
    CascadeListComponent,
    ObjectToArrayPipe
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
    SelectListComponent,
    BubbleComponent
  ],
  providers: [ModalService, SelectListService],
  entryComponents: [SelectListComponent, CascadeListComponent]
})
export class SharedModule {
  constructor( @Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
