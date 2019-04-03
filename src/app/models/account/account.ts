import {Coords} from '../../interfaces/coords';

export class Account {
  $uid?: string;
  business_name: string;
  business_type: string;
  email: string;
  phone: string;
  adress: string;
  state: string;
  city: string;
  coords: Coords;

  constructor() {
    this.state = '';
    this.phone = '';
    this.adress = '';
    this.city = '';
  }
}
