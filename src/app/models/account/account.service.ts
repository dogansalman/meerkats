import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Account} from './account';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable()
export class AccountService {
  constructor(private db: AngularFireDatabase, private fireAuth: AngularFireAuth) {}

  create(data: Account, password: string): Promise<any> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(data.email, password).then((u) => {
      delete data['password'];
      this.db.database.ref('account/').child(u.user.uid).set(data).then(() => this.fireAuth.auth.currentUser.sendEmailVerification());
    });
  }
  update(data: Account, uid: string): Promise<any> {
    return this.db.object('account/' + uid).update(data);
  }
}
