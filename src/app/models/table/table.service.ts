import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Table} from './table';


@Injectable()
export class TableService {

  constructor(private db: AngularFireDatabase) { }

  get(): AngularFireList<Table> {
    return this.db.list('/table');
  }

  getLocation(data: any[]): any {
    return data.map(item => item.location).filter((value, index, self) => self.indexOf(value) === index);
  }


  detail() { }

  delete(data: Table) {
    // TODO add queryFn before deleting item on firebase
    // TODO check table status opened or closed
    return new Promise((resolve, reject) => {
      this.db.object('/table/' + data.$key).remove().then(() => resolve(true))
        .catch(err => reject(err));
    });
  }

  update(data: Table) {
    return new Promise((resolve, reject) => {
      const key = data.$key;
      delete data.$key;
      this.db.object('/table/' + key).update(data)
        .then(() => resolve(Object.assign(data, {'$key': key})))
        .catch(() => reject(null));
    });
  }

  create(data: Table) {
    return new Promise((resolve, reject) => {
      this.db.list('/table').push(data).then(() => resolve(data));
    });
  }
}
