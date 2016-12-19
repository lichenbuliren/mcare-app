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

export const SELECTOR_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectControlComponent),
  multi: true
};

const noop = () => {
};

@Component({
  selector: 'select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [SELECTOR_CONTROL_VALUE_ACCESSOR],
  host: {
    'class': 'selector-control'
  }
})
export class SelectControlComponent implements OnInit, ControlValueAccessor {

  private _result: string;
  private _value: any;

  // ======= 输入属性 =======
  @Input() name: string;
  @Input() label: string;
  @Input() result: string;

  // ======= 输出属性 =======
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _


  constructor() { }

  ngOnInit() {
  }

  /**
   * Write a new value to the element.
   */
  writeValue(value: any) {
    this._value = value;
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  };

  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

}
