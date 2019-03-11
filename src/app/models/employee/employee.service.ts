import {Injectable} from '@angular/core';
import {Employee} from './employee';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class EmployeeService {

  employees: Employee[];

  constructor(private db: AngularFireDatabase) { }

  get() {
    return new Promise((resolve, reject) => {
      this.employees = [];
      this.db.list('/employee', ref => ref.orderByChild('business_id').equalTo('dummy')).snapshotChanges().subscribe(res => {
        res.forEach(element => {
          const item = element.payload.toJSON();
          item['$key'] = element.key;
          this.employees.push(item as Employee);
        });
        return resolve(this.employees);
      });
    });
  }

  update(data: Employee) {
    return new Promise((resolve, reject) => {
      const key = data.$key;
      delete data.$key;
      this.db.object('/employee/' + key).update(data)
        .then(() => resolve(Object.assign(data, {'$key': key})))
        .catch(() => reject(null));
    });
  }

  create(data: Employee) {
    return new Promise((resolve, reject) => {
      this.db.list('/employee').push(data).then(() => resolve(data));
    });
  }

  delete(data: Employee) {
    // TODO add queryFn before deleting item on firebase
    return new Promise((resolve, reject) => {
      this.db.object('/employee/' + data.$key).remove().then(() => resolve(true))
        .catch(err => reject(err));
    });
  }
}
