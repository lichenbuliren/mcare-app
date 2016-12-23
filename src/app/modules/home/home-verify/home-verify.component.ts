import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ModalService } from '../../../shared/modal';

@Component({
  selector: 'app-home-verify',
  templateUrl: './home-verify.component.html',
  styleUrls: ['./home-verify.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeVerifyComponent implements OnInit {
  username: string = 'wrf';
  modalId: string;

  constructor(private modalService: ModalService) {
    this.modalId = +new Date() + '';
  }

  ngOnInit() {
  }

  onSubmit() {
    // this.router.navigate(['../submit'], { relativeTo: this.activateRoute});
    console.log('home 提交表单');
  }
}
