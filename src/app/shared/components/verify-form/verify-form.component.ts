import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ValidatorsService } from '../../../services/validators.service';

@Component({
  selector: 'app-verify-form',
  templateUrl: './verify-form.component.html',
  styleUrls: ['./verify-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerifyFormComponent implements OnInit {
  formActive: boolean = true;
  color: string = 'green';
  verifyFormGroup: FormGroup;
  username: AbstractControl;
  mobile: AbstractControl;
  captcha: AbstractControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.verifyFormGroup = this.formBuilder.group({
      'username': ['张三', Validators.required],
      'mobile': ['13688888888', ValidatorsService.mobileValidator],
      'captcha': ['', Validators.required]
    });

    this.username = this.verifyFormGroup.controls['username'];
    this.mobile = this.verifyFormGroup.controls['mobile'];
    this.captcha = this.verifyFormGroup.controls['captcha'];
  }

  onSubmit(event) {
    event.preventDefault();
    // TODO 校验短信验证码是否正确，
    // 如果正确，则保存数据到单例模式的 service 内
    return false;
  }

  // 重置表单小技巧
  resetForm() {
    this.formActive = false;
    this.initForm();
    setTimeout(() => this.formActive = true, 0);
  }
}
