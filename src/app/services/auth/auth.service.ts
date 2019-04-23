import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {Observable} from 'rxjs/internal/Observable';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public afAuth: AngularFireAuth, public router: Router, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  get currentUserObservable(): Observable<User | null> {
    return this.afAuth.authState;
  }
  get getProfileDetail(): Observable<any | null> {
    return this.db.object('account/' + this.afAuth.auth.currentUser.uid).valueChanges();
  }
  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['home']);
    } catch (e) {
      return false;
    }
  }
  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
  get IsLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
  forgot(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  resetPassword(password: string): Promise<any> {
    return this.afAuth.auth.currentUser.updatePassword(password);
  }

}

