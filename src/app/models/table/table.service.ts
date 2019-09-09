import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Table} from './table';
import {AuthService} from '../../services/auth/auth.service';

@Injectable()
export class TableService {

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  get(): AngularFireList<Table> {
    return this.db.list('/table/' + this.auth.user.uid);
  }

  getLocation(data: any[]): any {
    return data.map(item => item.location).filter((value, index, self) => self.indexOf(value) === index);
  }

  delete(data: Table): any {
    // TODO add queryFn before deleting item on firebase
    // TODO check table status opened or closed
    return this.db.object('/table/' + this.auth.user.uid + '/' + data.$key).remove();
  }

  update(data: Table): any {
    const key = data.$key;
    delete data.$key;
    return  this.db.object('/table/' + this.auth.user.uid + '/' + key).update(data);
  }

  create(data: Table): any {
    delete data.$key;

    const t = new Table();
    Object.assign(t, data);

    /* Create QR code */
    t.qr = this.db.createPushId();

    return this.db.list('table/' + this.auth.user.uid + '/').push(t);
  }
}
