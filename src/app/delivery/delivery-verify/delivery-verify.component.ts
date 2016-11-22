import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ValidatorsService } from '../../shared/services/validators.service';

@Component({
  selector: 'delivery-verify',
  templateUrl: './delivery-verify.component.html',
  styleUrls: ['./delivery-verify.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeliveryVerifyComponent implements OnInit {
  formActive: boolean = true;
  color: string = 'green';
  verifyInfo: FormGroup;
  username: AbstractControl;
  mobile: AbstractControl;
  captcha: AbstractControl;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.verifyInfo = this.formBuilder.group({
      'username': ['魏如峰', Validators.required],
      'mobile': ['13602532846', ValidatorsService.mobileValidator],
      'captcha': ['', Validators.required]
    });

    this.username = this.verifyInfo.controls['username'];
    this.mobile = this.verifyInfo.controls['mobile'];
    this.captcha = this.verifyInfo.controls['captcha'];
  }

  onSubmit() {
    console.log(this.verifyInfo.value);
  }

  // 重置表单小技巧
  resetForm() {
    this.formActive = false;
    this.initForm();
    setTimeout(() => this.formActive = true, 0);
  }

  _handleChildFocus() {
    console.log('父容器处理子集 focus 事件');
  }

  handleBlur() {
    console.log('blur');
  }
}
