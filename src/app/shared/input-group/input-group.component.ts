import {
  forwardRef,
  Component,
  HostBinding,
  Input,
  Directive,
  AfterContentInit,
  ContentChild,
  SimpleChange,
  ContentChildren,
  ViewChild,
  ElementRef,
  QueryList,
  OnChanges,
  EventEmitter,
  Output,
  NgModule,
  ModuleWithProviders,
  ViewEncapsulation,
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// 默认空函数
const noop = () => {
};

// 默认 input-group id
let nextUniqueId = 0;

@Directive({
  selector: 'input-label'
})
export class InputLabel {
}

@Directive({
  selector: 'input-icon',
})
export class InputIcon {
}


@Component({
  selector: 'input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  providers: [InputLabel, InputIcon],
  host: {'(click)': 'focus()'},
  encapsulation: ViewEncapsulation.None
})
export class InputGroupComponent implements ControlValueAccessor, AfterContentInit, OnChanges {
  private _focused: boolean = false;
  private _value: any = '';

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  // 子元素
  @ContentChild(InputLabel) inputLabel: InputLabel;
  @ContentChild(InputIcon) inputIcon: InputIcon;

  // 只读属性
  get focused() {
    return this._focused;
  }

  get empty() {
    return (this._value == null || this._value === '') && this.type !== 'date';
  }

  get inputId(): string {
    return `${this.id}-input`;
  }

  @Input() id: string = `input-group-${nextUniqueId++}`;
  @Input() max: string | number = null;
  @Input() maxlength: number = null;
  @Input() min: string | number = null;
  @Input() minlength: number = null;
  @Input() placeholder: string = null;
  @Input() type: string = 'text';
  @Input() name: string = null;

  private _disabled: boolean = false;
  private _readonly: boolean = false;
  private _required: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled}
  set disabled(value) { this._disabled = value}

  constructor() {
  }

  ngOnInit() {
  }

}

