import {Injectable} from '@angular/core';
import {Employee} from './employee';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class EmployeeService {

  employees: Employee[];

  constructor(private db: AngularFireDatabase) { }

  get(): AngularFireList<Employee> {
    return this.db.list('/employee');
  }

  update(data: Employee): any {
    const key = data.$key;
    delete data.$key;
    return  this.db.object('/employee/' + key).update(data);
  }

  create(data: Employee): any {
    delete data.$key;
    return this.db.list('employee').push(data);
  }

  delete(data: Employee) {
    // TODO add queryFn before deleting item on firebase
    return new Promise((resolve, reject) => {
      this.db.object('/employee/' + data.$key).remove().then(() => resolve(true))
        .catch(err => reject(err));
    });
  }
}
