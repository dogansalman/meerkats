import {order} from '../interfaces/order';

export interface orders {

  table_id: number;
  table_location: string,
  table_numb: string;
  note: string;
  state: string;
  order: Array<order>;

}
