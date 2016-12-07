import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.router.navigate(['../submit'], { relativeTo: this.activateRoute});
    console.log('提交表单');
  }
}
