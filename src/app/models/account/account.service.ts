import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Account} from './account';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class AccountService {
  constructor(private db: AngularFireDatabase, private fireAuth: AngularFireAuth) {}

  create(data: Account): any {
    return this.fireAuth.auth.createUserWithEmailAndPassword(data.email, data.password).then((u) => {
      this.db.list('account').push(Object.assign(data, {'uid': u.user.uid}));
    });
  }
}
