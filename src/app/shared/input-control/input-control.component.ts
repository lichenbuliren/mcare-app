import {
  Component,
  HostListener,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  ViewEncapsulation, OnInit,
} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

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
    '[class.focus]': 'focused'
  },
  encapsulation: ViewEncapsulation.None
})
export class InputControlComponent implements ControlValueAccessor, OnInit {
  private _focused: boolean = false;
  private _value: any = '';

  /** Callback registered via registerOnTouched (ControlValueAccessor) */
  private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;

  private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  // 外部传入属性
  @Input() type: string = 'text';
  @Input() name: string = null;
  @Input() placeholder: string = null;

  // @ViewChild('inputControl') _inputControlElement: ElementRef;
  @ViewChild('input') _inputElement: ElementRef;
  @ViewChild('iconDelete') iconDelete: ElementRef;

  constructor(private hostRef: ElementRef) {
  }

  ngOnInit() {
    console.log(this.hostRef.nativeElement);
  }

  // 监听全局的点击事件，如果不是当前 input-control 组，则视为失去焦点操作
  @HostListener('window:click', ['$event'])
  inputControlBlurHandler(event) {
    var parent = event.target;
    // 如何当前节点不是宿主节点，并且不等于 document 节点
    while (parent != this.hostRef.nativeElement && parent != document) {
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


  /** Set focus on input */
  focus() {
    this._inputElement.nativeElement.focus();
  }

  _handleFocus(event: FocusEvent) {
    console.log('focus event triggered');
    this._focused = true;
    this._focusEmitter.emit(event);
  }

  _handleClear() {
    console.log('clear event triggered');
    this.value = '';
    return false;
  }

  _handleBlur(event: FocusEvent) {
    console.log('blur event triggered');
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

