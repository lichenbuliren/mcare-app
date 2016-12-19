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

// 要实现双向数据绑定，这个不可少
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
    '[class.focus]': 'focused',
    'class': 'input-control'
  },
  encapsulation: ViewEncapsulation.None,
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputControlComponent implements ControlValueAccessor {
  private _focused: boolean = false;
  private _value: any = '';
  private _disabled: boolean = false;
  private _readonly: boolean = false;
  private _required: boolean = false;

  /** Callback registered via registerOnTouched (ControlValueAccessor)
   * 此属性在做表单校验的时候，不可少，
   * 如果缺少了这个属性，FormControl.touched 属性将监测不到，切记！！
   */
  private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;

  private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  private _blurEmitter: EventEmitter<any> = new EventEmitter<any>();
  private _inputChangeEmitter: EventEmitter<any> = new EventEmitter<any>();

  // 外部传入属性
  @Input() type: string = 'text';
  @Input() name: string = null;
  @Input() placeholder: string = null;
  @Input() minlength: number;
  @Input() maxlength: number;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = this._coerceBooleanProperty(value);
  }

  @Input()
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value) {
    this._readonly = this._coerceBooleanProperty(value);
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value) {
    this._required = this._coerceBooleanProperty(value);
  }

  @ViewChild('input') _inputElement: ElementRef;
  @ViewChild('iconDelete') iconDelete: ElementRef;

  constructor(private hostRef: ElementRef) {
  }

  ngOnInit() {
  }

  // 监听全局的点击事件，如果不是当前 input-control 组，则视为失去焦点操作
  @HostListener('window:click', ['$event'])
  inputControlBlurHandler(event) {
    var parent = event.target;
    // 如何当前节点不是宿主节点，并且不等于 document 节点
    while (parent && parent != this.hostRef.nativeElement && parent != document) {
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
      // 触发值改变事件，冒泡给父级
      this._onChangeCallback(v);
    }
  }

  // 对外暴露 focus 事件
  @Output('focus') onFocus = this._focusEmitter.asObservable();

  // 宿主聚焦
  focus() {
    // 触发下面的 _handleFocus() 事件
    this._inputElement.nativeElement.focus();
  }

  // 输入框聚焦
  _handleFocus(event: FocusEvent) {
    this._focused = true;
    this._focusEmitter.emit(event);
  }

  // 这里触发 blur 操作，但是不改变 this._focused 的值，
  // 不然删除图标无法实现它的功能，
  //设置 this._focused 的值将由上面的 @HostListener('window:click', ['$event']) 来处理
  _handleBlur(event: any) {
    this._onTouchedCallback();
    this._blurEmitter.emit(event);
  }

  // 清空输入值
  _handleClear() {
    this.value = '';
    return false;
  }

  private _convertValueForInputType(v: any): any {
    switch (this.type) {
      case 'number':
        return parseFloat(v);
      default:
        return v;
    }
  }

  private _coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
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

