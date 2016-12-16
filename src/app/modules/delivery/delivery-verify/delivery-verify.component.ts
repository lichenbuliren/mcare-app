import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalService } from '../../../shared/modal/';

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

  modalId: string;


  constructor(
    private modalService: ModalService,
    private router: Router,
    private activateRoute: ActivatedRoute) {
    this.modalId = +new Date() + '';
  }

  ngOnInit() {

  }

  actionOnConfirm($event) {
    console.log('弹层确定回调', $event);
  }

  actionOnCancel() {
    console.log('弹层取消回调');
  }

  onSubmit() {
    // this.router.navigate(['../submit'], { relativeTo: this.activateRoute});
    this.modalService.open(this.modalId);
    console.log('提交表单');
  }
}
