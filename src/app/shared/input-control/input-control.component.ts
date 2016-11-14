import {
  forwardRef,
  Component,
  HostListener,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputControlComponent),
  multi: true
};

const noop = () => {
};

@Component({
  selector: 'input-control',
  templateUrl: 'input-control.component.html',
  styleUrls: ['input-control.component.scss'],
  host: {
    // 宿主元素 click 事件，触发 focus() 事件
    '(click)': 'focus()',
    // 切换宿主元素 focus 样式
    // '[class.focus]': 'focused'
  },
  encapsulation: ViewEncapsulation.None,
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputControlComponent implements ControlValueAccessor {
  private _focused: boolean = false;
  private _value: any = '';

  /** Callback registered via registerOnTouched (ControlValueAccessor) */
  private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;

  private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  private _inputChangeEmitter: EventEmitter<any> = new EventEmitter<any>();

  // 外部传入属性
  @Input() type: string = 'text';
  @Input() name: string = null;
  @Input() placeholder: string = null;

  @ViewChild('inputControl') _inputControlElement: ElementRef;
  @ViewChild('input') _inputElement: ElementRef;
  @ViewChild('iconDelete') iconDelete: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  // 监听全局的点击事件，如果不是当前 input-control 组，则视为失去焦点操作
  @HostListener('window:click', ['$event'])
  inputControlBlurHandler(event) {
    var parent = event.target;
    // 如何当前节点不是宿主节点，并且不等于 document 节点
    while (parent && parent != this._inputControlElement.nativeElement && parent != document) {
      // 取当前节点的父节点继续寻找
      parent = parent.parentNode;
    }

    // 找到最顶层，则表示已经不在宿主元素内部了，触发失去焦点 fn
    if (parent == document) {
      this._focused = false;
    }
  }

  // 只读属性
  get focused() {
    return this._focused;
  }

  // value 属性，以 get 方式拦截
  get value(): any {
    return this._value;
  };

  @Input() set value(v: any) {
    v = this._convertValueForInputType(v);
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
      this._inputChangeEmitter.emit(v);
    }
  }

  @Output('focus')
  get onFocus(): Observable<FocusEvent> {
    return this._focusEmitter.asObservable();
  }

  @Output('blur')
  get onBlur(): Observable<FocusEvent> {
    return this._blurEmitter.asObservable();
  }

  // 对外暴露事件
  @Output('inputChange')
  get onInputChange(): Observable<any> {
    return this._inputChangeEmitter.asObservable();
  }


  // 输入框聚焦
  focus() {
    this._inputElement.nativeElement.focus();
  }

  _handleFocus(event: FocusEvent) {
    this._focused = true;
    this._focusEmitter.emit(event);
  }

  _handleClear() {
    this.value = '';
    return false;
  }

  _handleBlur(event: FocusEvent) {
    this._blurEmitter.emit(event);
  }

  _handleChange(event: Event) {
    this.value = (<HTMLInputElement>event.target).value;
  }

  private _convertValueForInputType(v: any): any {
    switch (this.type) {
      case 'number':
        return parseFloat(v);
      default:
        return v;
    }
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

