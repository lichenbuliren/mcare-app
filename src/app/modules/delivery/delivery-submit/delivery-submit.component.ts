import { Component, OnInit, ViewEncapsulation, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ServiceSupportService } from '../../../core/service-support.service';
import { ModalService, ModalComponent } from '../../../shared/modal/';
import { SelectListComponent } from '../../../shared/select-list/';
import { CascadeListComponent } from '../../../shared/cascade-list/cascade-list.component';

@Component({
  selector: 'delivery-device',
  templateUrl: './delivery-submit.component.html',
  styleUrls: ['./delivery-submit.component.scss'],
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
  serviceTypeObj: any;
  faultTypeObj: any;
  faultRemark: string;
  areaData: any;

  constructor(
    @Inject('ConstConfig') private constConfig: any,
    private formBuilder: FormBuilder,
    private serviceSupportService: ServiceSupportService,
    private modalService: ModalService) {
  }

  ngOnInit() {
    if (localStorage.getItem('DeliveryDataKey')) {
      this.localData = JSON.parse(localStorage.getItem('DeliveryDataKey'));
    } else {
      this.localData = {};
    }
    this.serviceTypeObj = this.constConfig.serviceType[0];
    this.faultTypeObj = this.constConfig.faultList[0];
    this.deliveryFormGroup = this.formBuilder.group({
      'sn': [this.localData.sn, Validators.required],
      'serviceType': [this.serviceTypeObj, Validators.required],
      'faultType': [this.faultTypeObj, Validators.required]
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
        this.modalService.open<SelectListComponent>(SelectListComponent, {
          default: [this.serviceTypeObj],
          listData: this.constConfig.serviceType
        }).subscribe(componentRef => {
          let instance = componentRef.instance;
          if (!instance.selected.length) return;
          this.serviceType.setValue(instance.selected[0]);
          this.serviceTypeObj = instance.selected[0];
        });
        break;
      case 'faultType':
        this.modalTitle = '请选择故障类型';
        this.modalService.open<SelectListComponent>(SelectListComponent, {
          default: [this.faultTypeObj],
          listData: this.constConfig.faultList,
          multiple: true,
          remark: this.faultRemark
        }).subscribe(componentRef => {
          let instance = componentRef.instance;
          let faultsText = [];
          let faultsIds = [];
          if (!instance.selected.length) return;

          instance.selected.forEach((item) => {
            faultsIds.push(item.id);
            faultsText.push(item.label);
          });

          faultsText.push(instance.remark);
          this.faultRemark = instance.remark;

          this.faultTypeObj = {
            id: faultsIds.join(','),
            label: faultsText.join(',')
          }

          this.faultType.setValue(this.faultTypeObj);
        });
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
