import {Component, OnInit} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ServiceSupportService } from '../../../core/service-support.service';

@Component({
  selector: 'delivery-device',
  templateUrl: 'delivery-submit.component.html',
  styleUrls: ['delivery-submit.component.scss']
})
export class DeliverySubmitComponent implements OnInit {
  formActive: boolean = true;
  deliveryFormGroup: FormGroup;
  sn: AbstractControl;

  localData: any;

  constructor(
    private formBuilder: FormBuilder,
    private serviceSupport: ServiceSupportService) {
  }

  ngOnInit() {
    if (localStorage.getItem('DeliveryDataKey')) {
      this.localData = JSON.parse(localStorage.getItem('DeliveryDataKey'));
    } else {
      this.localData = {};
    }
    this.deliveryFormGroup = this.formBuilder.group({
      'sn': [this.localData.sn, Validators.required]
    });

    this.sn = this.deliveryFormGroup.controls['sn'];
  }

}
