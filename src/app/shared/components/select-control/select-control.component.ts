import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';

import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'select-control'
  }
})
export class SelectControlComponent implements OnInit{

  // ======= 输入属性 =======
  @Input() name: string;
  @Input() label: string;
  @Input() result: string;

  constructor() { }

  ngOnInit() {
  }

}
