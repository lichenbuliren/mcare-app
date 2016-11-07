import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";

@Injectable()
export class OrderService implements CanActivate {

  canActivate() {
    console.log('验证用户名，手机号，短信验证码');
    return true;
  }
}
