import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ServiceSupportService } from '../../../core/service-support.service';
import { ModalService, ModalComponent } from '../../../shared/modal/';
import { SelectListComponent } from '../../../shared/components/select-list/select-list.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'delivery-device',
  templateUrl: 'delivery-submit.component.html',
  styleUrls: ['delivery-submit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeliverySubmitComponent implements OnInit {
  formActive: boolean = true;
  deliveryFormGroup: FormGroup;
  sn: AbstractControl;
  serviceType: AbstractControl;
  faultType: AbstractControl;

  localData: any;
  modalTitle: string;
  modalId: string;

  constructor(
    private formBuilder: FormBuilder,
    private serviceSupport: ServiceSupportService,
    private modalService: ModalService) {
    this.modalId = +new Date() + '';
  }

  ngOnInit() {
    console.log('this.modalId: ', this.modalId);
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

  _handleSelectClick(event, type) {
    event.stopPropagation();
    switch (type) {
      case 'serviceType':
        this.modalTitle = '请选择维修类型';
        console.log('service type click');
        // TODO 动态加载服务类型组件
        this.modalService.open<SelectListComponent>(SharedModule, SelectListComponent, {
          selected: {
            label: '维修',
            val: 1,
            isActive: true
          }
        }).subscribe(componentRef => {
          console.log(componentRef.instance.selected);
        });
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

  actionOnConfirm() {

  }
}
