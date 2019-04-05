import {Coords} from '../../interfaces/coords';

export class Account {
  $uid?: string;
  business_name: string;
  business_type: string;
  email: string;
  phone: string;
  adress: string;
  district: string;
  province: string;
  coords: Coords;

  constructor() {
    this.province = '';
    this.phone = '';
    this.adress = '';
    this.district = '';
  }
}
