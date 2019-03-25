import {Injectable} from '@angular/core';
import {Employee} from './employee';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AuthService} from '../../services/auth/auth.service';

@Injectable()
export class EmployeeService {

  employees: Employee[];

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  get(): AngularFireList<Employee> {
    return this.db.list('/employee/' + this.auth.user.uid);
  }

  update(data: Employee): any {
    const key = data.$key;
    delete data.$key;
    return  this.db.object('/employee/' + this.auth.user.uid + '/' + key).update(data);
  }

  create(data: Employee): any {
    delete data.$key;
    return this.db.list('employee/' + this.auth.user.uid + '/').push(data);
  }

  delete(data: Employee) {
   return this.db.object('/employee/' + this.auth.user.uid + '/' + data.$key).remove();
  }
}
