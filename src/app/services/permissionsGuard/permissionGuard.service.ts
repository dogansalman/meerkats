import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';

/* Permission keys for routing rules.
 * Permission names in i18n with permission_[id] */
export const PermissionKeys =  [0, 1, 2, 3, 4];

@Injectable()
export class PermissionGuardService implements  CanActivate {

  // Route name key : permission code
  private routePermission = [
    {'route': [0, 2, 3]},
    {'route': [0, 2, 3]}
  ];

  constructor(private _router: Router) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // TODO check auth with permission
     // if (this._authService.isAuthenticated()) {
     //   return true;
     // }

    // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}




