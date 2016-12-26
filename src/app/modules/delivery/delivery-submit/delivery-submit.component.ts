import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ServiceSupportService } from '../../../core/service-support.service';
import { ModalService, ModalComponent } from '../../../shared/modal/';
import { SelectListComponent } from '../../../shared/select-list/';
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
  serviceTypeObj = {
    id: 1,
    label: '维修'
  }

  faultTypeArr = [{
    id: 1,
    label: '进水'
  }, {
    id: 2,
    label: '无声音'
  }];

  constructor(
    private formBuilder: FormBuilder,
    private serviceSupport: ServiceSupportService,
    private modalService: ModalService) {
  }

  ngOnInit() {
    if (localStorage.getItem('DeliveryDataKey')) {
      this.localData = JSON.parse(localStorage.getItem('DeliveryDataKey'));
    } else {
      this.localData = {};
    }
    this.deliveryFormGroup = this.formBuilder.group({
      'sn': [this.localData.sn, Validators.required],
      'serviceType': [this.serviceTypeObj, Validators.required],
      'faultType': [this.faultTypeArr, Validators.required]
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
        // TODO 动态加载服务类型组件
        this.modalService.create<SelectListComponent>(SharedModule, SelectListComponent, {
          default: [this.serviceTypeObj]
        }).subscribe(componentRef => {
          let instance = componentRef.instance;
          if (!instance.selected.length) return;
          this.serviceType.setValue(instance.selected[0]);
          this.serviceTypeObj = instance.selected[0];
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
