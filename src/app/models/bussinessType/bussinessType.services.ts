import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class BussinessTypeServices {

  constructor(private db: AngularFireDatabase) { }

  get() {
    return this.db.list('/business_type');
  }

}

