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
}
