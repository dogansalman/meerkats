import {Coords} from '../../interfaces/coords';

export class Account {
  $uid?: string;
  business_name: string;
  business_type: string;
  email: string;
  phone: string  = null;
  adress: string = null;
  state: string = null;
  city: string = null;
  coords: Coords = null;
}
