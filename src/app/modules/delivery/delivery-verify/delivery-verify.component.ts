import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// import { PopupComponent } from '../../../shared/components/popup/popup.component';

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

  dialogShow: boolean = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {

  }

  actionOnSubmit() {
    console.log('弹层打开');
  }

  actionOnClose() {
    console.log('弹层关闭');
  }

  onSubmit() {
    // this.router.navigate(['../submit'], { relativeTo: this.activateRoute});
    this.dialogShow = true;
    console.log('提交表单');
  }
}
