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
  serviceType: AbstractControl;
  faultType: AbstractControl;

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
      'sn': [this.localData.sn, Validators.required],
      'serviceType': ['维修', Validators.required],
      'faultType': ['进水', Validators.required]
    });

    this.sn = this.deliveryFormGroup.controls['sn'];
    this.serviceType = this.deliveryFormGroup.controls['serviceType'];
    this.faultType = this.deliveryFormGroup.controls['faultType'];
  }

  _handleSelectClick(type) {
    switch (type) {
      case 'serviceType':
        // TODO 动态加载服务类型组件
        break;
      case 'faultType':
        // TODO 动态加载故障类型组件
        break;
      case 'send-address':
        // TODO 动态加载地址组件
      default:
        break;
    }
  }


}
