import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ValidatorsService {

  static mobileReg = /^1[3|4|5|6|7|8]\d{9}/;

  constructor() { }

  static mobileValidator(c: FormControl) {
    return ValidatorsService.mobileReg.test(c.value) ? null : {
      mobile: {
        invalid: true
      }
    }
  }
}
