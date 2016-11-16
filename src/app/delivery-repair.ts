import { BaseRepair } from "./base-repair";

export class DeliveryRepair implements BaseRepair {
  mobile: string;
  username: string;
  captcha: string;
  apply_code: number;
  source: string;
  ab: string = 'sf';
  repair_code: number;
  province: string;
  city: string;
  fault: string;
  fault_remark?: string;
  sms_type: number = 2;
  is_take: number = 0;
  send_province: string;
  send_city: string;
  send_county: string;
  send_address: string;
  send_area_code: string;
  send_tel: string = this.mobile;
  rec_tel: string = this.send_tel;
  rec_username: string = this.username;
  rec_province: string = this.send_province;
  rec_city: string = this.send_city;
  rec_county: string = this.send_county;
  rec_area_code: string = this.send_area_code;
  outlets_code: number;
  is_agress: boolean = false;

  constructor({
    mobile,
    username,
    captcha,
    apply_code,
    source,
    ab,
    repair_code,
    province,
    city,
    fault,
    fault_remark,
    sms_type,
    is_take,
    send_province,
    send_city,
    send_county,
    send_address,
    send_area_code,
    send_tel,
    rec_tel,
    rec_username,
    rec_province,
    rec_city,
    rec_county,
    rec_area_code,
    outlets_code,
    is_agree
  }) {
    this.mobile = mobile;
    this.username = username;
    this.captcha = captcha;
    this.apply_code = apply_code;
    this.source = source;
    this.ab = ab;
    this.repair_code = repair_code;
    this.province = province;
    this.city = city;
    this.fault = fault;
    this.fault_remark = fault_remark;
    this.sms_type = sms_type;
    this.is_take = is_take;
    this.send_province = send_province;
    this.send_city = send_city;
    this.send_county = send_county;
    this.send_address = send_address;
    this.send_area_code = send_area_code;
    this.send_tel = send_tel;
    this.rec_tel = rec_tel;
    this.rec_username = rec_username;
    this.rec_province = rec_province;
    this.rec_city = rec_city;
    this.rec_county = rec_county;
    this.rec_area_code = rec_area_code;
    this.outlets_code = outlets_code;
    this.is_agree = is_agree;
  }
}
