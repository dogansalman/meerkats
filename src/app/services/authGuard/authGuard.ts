import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from '../auth/auth.service';
import {map, tap} from 'rxjs/operators';



@Injectable()
export class AuthGuard {


  public a = false;
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

  return this.auth.currentUserObservable.pipe(
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
  getValueFromObservable(): Observable<boolean> {
    return this.auth.currentUserObservable.pipe(
      map(user => !!user)
    );
  }


  canLoad(
    route: Route,
    ): boolean {
    // TODO Observable dönen boolean sonuça göre return edemedim. Bu durumda yönlendirme için localstorage deki değere güveniyoruz.
    if (this.auth.IsLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
