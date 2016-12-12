## 构建一个自定义 angular2 输入组件
今天我们来学习如何正确的构建和一个具有和 `<input type="text">` 同样作用，但同时也具有自己的逻辑的输入组件。

在开始文章之前，在读这篇文章之前，希望你已经把官方的文档和案例都看过至少一遍了，具体的一些概念和细节不会在文章中讲解。

我们先来看一下我们这篇文章里面所介绍的组件的表现形式是怎么样的：

![目标图](/angular2-demo.gif)

OK，上图就是我们所要达到的效果了。那么，我们来分析下我们这个组件改具备哪些功能。

- 聚焦的时候，底部边框为绿色
- 具有自己的部分逻辑，比如在有输入值的情况下，会出现一个删除图标
- 当输入值为空的时候，提示错误文案
- 可以插入其它的 DOM，比如最下面的发送验证码按钮
- 支持 `input` 的必要属性，比如 `maxlength、placeholder`等
- 支持表单 `angular2 form-control` 表单绑定，如上图中的值都是从 `FormBuilder` 中构建的

<!-- more -->

我们将在后面一步步的来讲解如何实现这样一个自定义组件的功能；

## 创建一个 angular2 组件
我们先来构建一个基础的 `angular2` 组件,这里我们先新建一个叫做 `input-control` 的组件。

首先是 `input-control.component.ts` 文件：

``` typescript
@Component({
  selector: 'input-control',
  templateUrl: 'input-control.component.html',
  styleUrls: ['input-control.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
```

然后是 `input-control.component.html` 文件：

``` html
<input #input
  [type]="type"
  [name]="name"
  (focus)="_handleFocus($event)"
  (blur)="_handleBlur($event)"
  [placeholder]="placeholder"
  [(ngModel)]="value"
  [minlength]="minlength"
  [maxlength]="maxlength"
  [readonly]="readonly"
  [disabled]="disabled">
<i #iconDelete *ngIf="focused && !readonly" class="icon icon-delete" (click)="_handleClear($event)"></i>
```

剩下就是 `input-control.component.scss` 文件了，这里我就补贴出代码了，各位可以根据自己的项目来设置对应的样式

最后，就是我们调用的时候的方式:

``` html
<input-control class="input-control"
  [class.error]="!mobile.valid && mobile.touched"
  type="tel"
  name="mobile"
  placeholder="手机号"
  maxlength="11"
  [formControl]="mobile">
  <p *ngIf="mobile.touched && mobile.hasError('mobile')" class="error-tips">请输入正确的手机号码</p>
</input-control>
```

是否对于上面的一些属性和变量感到困惑，别急，让我一步步道来！   

## 功能细分
### 输入属性 `@Input()`
有一点要谨记：**我们是在用 DIV 来模拟一个 input 的表现，同时具备自己的逻辑**; 所以，当我们需要 `input` 的对应属性值的时候，我们都需要从父容器传递到组件内部的 `input` 上面，所以在这里我们需要用到 `@Input` 特性了

我们在 `input-control.component.ts` 定义我们所需的一些属性：

``` typescript
@Component({
  selector: 'input-control',
  templateUrl: 'input-control.component.html',
  styleUrls: ['input-control.component.scss'],
  host: {
    // 宿主元素 click 事件，触发 focus() 事件
    '(click)': 'focus()',
    // 切换宿主元素 focus 样式
    '[class.focus]': 'focused'
  }
})
export class InputControlComponent {
  private _focused: boolean = false;
  private _value: any = '';
  private _disabled: boolean = false;
  private _readonly: boolean = false;
  private _required: boolean = false;

  // 外部传入属性
  @Input() type: string = 'text';
  @Input() name: string = null;
  @Input() placeholder: string = null;
  @Input() minlength: number;
  @Input() maxlength: number;

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

  // 只读属性
  get focused() {
    return this._focused;
  }

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
}
```
回顾的我们前面的 `input-control.component.html` 文件，我们定义了 `type`、`name`、`placeholder`、`minlength`、`maxlength` 可读写的属性，同时还有 `value`、`readonly`、`disabled`、`required` 等只读属性。通过 `[属性]="源"` 方式，接收父级传入的数据。

OK，属性我们都知道如何从父级去接收了，那么接下来我们来实现 **点击** 操作： 

我们先修改 `input-control.component.ts` 文件

``` typescript
@Component({
  ……
  host: {
    // 宿主元素 click 事件，触发 focus() 事件
    '(click)': 'focus()',
    // 切换宿主元素 focus 样式
    '[class.focus]': 'focused'
  }
})
```
我们利用了 `host` 这个属性，用来给宿主元素对应操作，传送门 [@Component 相关属性](https://angular.cn/docs/ts/latest/api/core/index/Component-decorator.html);
我们给宿主元素也就是 `<input-control></input-control>` 绑定了一个 `click` 事件，同时根据自身属性 `focused` 来切换一个 `.focus` 类。在我们组件的 `focus()` 事件中，我们需要让组件内部的 `input` 聚焦，同时切换自身的 `focused` 值。为了拿到我们组件内部的 `input` 元素，这里我们需要使用 `@ViewChild()`。

修改 `input-control.component.ts` 文件如下：

``` typescript
@Component({
  ……
  host: {
    // 宿主元素 click 事件，触发 focus() 事件
    '(click)': 'focus()',
    // 切换宿主元素 focus 样式
    '[class.focus]': 'focused'
  }
})
export class InputControlComponent {
  ……
  ……

  private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @ViewChild('input') _inputElement: ElementRef; // 组件内部 input 元素
  @ViewChild('iconDelete') iconDelete: ElementRef; // 删除图标元素

  constructor(private hostRef: ElementRef) {
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

  // 清空输入值
  _handleClear() {
    this.value = '';
    return false;
  }

  // 这里触发 blur 操作，但是不改变 this._focused 的值，
  // 不然删除图标无法实现它的功能，
  //设置 this._focused 的值将由上面的 @HostListener('window:click', ['$event']) 来处理
  // 触发父级的 blur 事件
  _handleBlur(event: any) {
    this._onTouchedCallback();
    this._blurEmitter.emit(event);
  }

  // 对外暴露 focus 事件
  @Output('focus') onFocus = this._focusEmitter.asObservable();
  ……
  ……
}
```
在上面的代码中，我们通过宿主的 `focus()` 事件，让 `input` 元素 `focus`, 同时 `input` 元素聚焦之后，会触发下面的 `_handleFocus()` 方法，在这个方法里面，我们修改组件自身的 `focused` 属性，并对外发射一个 `focus` 事件，用来像父级传递使用。同时，我们的删除图标也是根据组件的 `focused` 属性切换显示：
``` html
<input #input
  [type]="type"
  [name]="name"
  (focus)="_handleFocus($event)"
  (blur)="_handleBlur($event)"
  [placeholder]="placeholder"
  [(ngModel)]="value">
<i #iconDelete 
    *ngIf="focused && !readonly" 
    class="icon icon-delete" 
    (click)="_handleClear($event)"></i>
```
我们的 `input` 和组件内部的 `value` 属性进行了双向绑定，所以在 `_handleClear` 之后，我们的输入框的值自然也就被清空了。

### 值访问器 [ControlValueAccessor](https://angular.cn/docs/ts/latest/api/forms/index/ControlValueAccessor-interface.html)
在完成上面的一些步骤之后，我们的组件基本功能完成了，但是接下来还有最重要的一部分内容，那就是让我们的自定义组件获得 `值访问` 权限。
在官方的文档中有提到一点 [https://github.com/angular/material2/blob/master/src/lib/input/input.ts](https://github.com/angular/material2/blob/master/src/lib/input/input.ts) 

![值访问器](/images/angular2/control-access.png)
在查看官方的文档之后，我们发现要实现自定义组件的值访问权限，我们需要继承 `ControlValueAccessor` 接口，同时实现它内部的对应的接口

``` typescript
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
    '[class.focus]': 'focused'
  },
  // 
  encapsulation: ViewEncapsulation.None,
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputControlComponent implements ControlValueAccessor {
  ……
  ……
  /** Callback registered via registerOnTouched (ControlValueAccessor)
   * 此属性在做表单校验的时候，不可少，
   * 如果缺少了这个属性，FormControl.touched 属性将监测不到，切记！！
   */
  private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;

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
  ……
  ……
}
```
正如上面代码中所示的一样，实现了这些对应的接口之后，我们就能像使用普通的 `input` 元素一样使用我们的自定义组件了。


### 允许组件加载内部其它的 DOM 元素
回顾我们前面文章开头的 GIF 图片，我们还有一个获取验证码的按钮，同时，我们的错误提示也是放在组件内部的。要支持这种形式的，我们需要在组件内部加上 `<ng-content></ng-content>` 标签
有了这个之后，所有包裹在 `<input-control></input-control>` 组件内部的元素都将被渲染到组件内部

父组件调用 `input-control`:

``` html
<input-control class="input-control sms-control"
  [class.error]="!captcha.valid && captcha.touched"
  type="tel"
  name="captcha"
  placeholder="请输入验证码"
  [formControl]="captcha"
  maxlength="5">
  <count-down class="btn-send-sms" counter="50" title="获取验证码" countText="秒后重新获取"></count-down>
  <p *ngIf="!captcha.valid && captcha.touched" class="error-tips">请输入验证码</p>
</input-control>
```

浏览器渲染之后的的 DOM 结构：

``` html
<input-control class="input-control sms-control ng-untouched ng-pristine ng-invalid" maxlength="5" name="captcha" placeholder="请输入验证码" type="tel" ng-reflect-maxlength="5" ng-reflect-type="tel" ng-reflect-name="captcha" ng-reflect-placeholder="请输入验证码" ng-reflect-form="[object Object]">
  <input ng-reflect-maxlength="5" ng-reflect-name="captcha" ng-reflect-type="tel" type="tel" ng-reflect-placeholder="请输入验证码" placeholder="请输入验证码" maxlength="5" class="ng-untouched ng-pristine ng-valid">
<!--template bindings={
  "ng-reflect-ng-if": null
}-->
  <count-down class="btn-send-sms" counttext="秒后重新获取" counter="50" title="获取验证码" ng-reflect-counter="50" ng-reflect-title="获取验证码" ng-reflect-count-text="秒后重新获取"><button>获取验证码</button></count-down>
      <!--template bindings={
  "ng-reflect-ng-if": null
}-->
</input-control>
```

### 与 FormControl 结合使用注意事项
在后期的时候，我整合了自定输入组件与 `FormControl` 一起使用，在使用过程中，发现在需要使用 `.touched` 特性的时候，发现无法生效，通过查资料发现，如果需要让这个特性生性，我们的输入组件必须监听 `blur` 事件并且在处理事件中调用触发对外的 blur 事件，具体代码见前面的 `_handleBlur()` 内容。   
<br>
完整 Demo 地址：[mcare-app](https://github.com/lichenbuliren/mcare-app) 
这个 Demo 里面整合了路由、子模块、服务、动态表单等特性的使用方法，有兴趣的可以参考下，还在持续完善中。这个 Demo 是参照自己做过的项目部分UI，当然不会涉及核心的业务代码：）。

## 参考资料
[Angular2 material2 官方UI库](https://github.com/angular/material2/blob/master/src/lib/input/input.ts)
[CUSTOM FORM CONTROLS IN ANGULAR 2](http://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html)
[http://stackoverflow.com/questions/38447681/touched-untouched-not-updating-in-custom-input-component-angular-2](http://stackoverflow.com/questions/38447681/touched-untouched-not-updating-in-custom-input-component-angular-2)
