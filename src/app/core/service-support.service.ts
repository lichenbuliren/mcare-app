import { Injectable, Inject } from '@angular/core';
import { URLSearchParams, Jsonp, Response, Http } from '@angular/http';
import { Observable } from 'rxjs';

import * as Hashes from 'jshashes';

const smsConfig = {
  key: 'xxxx',
  client: 'xxxx'
}

/**
 * 服务支持服务类
 */
@Injectable()
export class ServiceSupportService {

  constructor(
    private _jsonp: Jsonp,
    private http: Http,
    @Inject('ApiConfig') private apiConfig: any) {
  }

  // 设置公共请求参数
  generateSearchParam(query?: {jsonp: boolean}): URLSearchParams {
    let search = new URLSearchParams();
    // 统一 jsonp 请求参数
    if (query.jsonp) search.set('callback', 'JSONP_CALLBACK');
    return search;
  }

  // 定位当前省份城市
  getLoaction(): Observable<any> {
    let search = this.generateSearchParam({ jsonp: true });
    search.set('ak', this.apiConfig.baiduMap.ak);
    return this._jsonp.get(this.apiConfig.baiduMap.location, {search: search})
    .map(res => res.json())
    .map(data => {
      let address = data.content.address_detail;
      return {
        province: address.province,
        city: address.city
      }
    }).catch((error) => Observable.throw(error.json().error || 'Server error'));
  }

  // 获取短信验证码
  sendSms(mobile): Observable<any> {
    let timestamp = +new Date();
    let sign = this.generateMsgSign(timestamp, mobile);
    return this.http.post(this.apiConfig.wan.sms, {
      phone: mobile,
      sign: sign,
      client: smsConfig.client,
      timestamp: timestamp
    }).map(res => res.json());
  }

  checkSms(opt): Observable<any> {
    return this.http.post(this.apiConfig.wan.checkSms, {
      phone: opt.phone,
      code: opt.captcha
    }).map(res => res.json()).map(json => {
      return json.data.success;
    }).catch((error) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * 获取短信接口签名
   * @param  {[type]} timestamp 时间戳
   * @param  {[type]} mobile    手机号
   * @return {[type]}           [description]
   */
  generateMsgSign(timestamp, mobile) {
    return new Hashes.SHA1().hex_hmac(smsConfig.key, '?phone=' + mobile + '&timestamp=' + timestamp);
  }

  checkSN(opt) {
    let search = this.generateSearchParam({ jsonp: true });

    // return this._jsonp.get(ApiConfig.csApi.checkSn, search)
  }
}
