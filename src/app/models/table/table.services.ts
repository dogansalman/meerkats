import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Table} from './table';

@Injectable()
export class TableServices {

  tables: Table[];
  constructor(private db: AngularFireDatabase) { }

  get() {
    return new Promise((resolve, reject) => {
      this.tables = [];
      this.db.list('/table', ref => ref.orderByChild('business_id').equalTo('dummy')).snapshotChanges().subscribe(res => {
        res.forEach(element => {
          const item = element.payload.toJSON();
          item['$key'] = element.key;
          this.tables.push(item as Table);
        });
        return resolve(this.tables);
      });
    });
  }

  getLocation(data: any[]): any {
    return data.map(item => item.location).filter((value, index, self) => self.indexOf(value) === index);
  }

  detail() { }

  delete(data: Table) {
    // TODO add queryFn before deleting item on firebase
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

}
