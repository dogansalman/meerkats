import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class TableServices {

  constructor(private db: AngularFireDatabase) { }

  get() {
    return this.db.list('/tables');
  }
}
