import { Component, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardServiceComponent implements CanActivate {
  routeActivated = false;
  constructor(private authService: AuthService, private router: Router) {
    console.log('AuthguardServiceComponent constructor called');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userLoginSubject.pipe(
      map((user) => {
        console.log(
          'AuthguardServiceComponent - canActivate called with user: '
        );
        console.log(user);
        return !!user; // return true if user exists, false otherwise
      })
    );
  }
}
// canActivate(
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): Observable<boolean> | Promise<boolean> | boolean {
//   this.authService.userLoginObservable.subscribe((user) => {
//     console.log('AuthguardServiceComponent - canActivate called with user: ');
//     console.log(user.userIsAuthenticated);
//     if (!user.userIsAuthenticated) {
//       console.log(
//         'AuthguardServiceComponent - user not logged in, navigating to login'
//       );
//       this.routeActivated = false;
//       this.router.navigate(['/']);
//     } else {
//       console.log('Setting AuthguardService isAuthenticated: True ');
//       this.routeActivated = true;
//     }

//     // this.isAuthenticated = !!user ? false : true;
//   });
//   // console.log('Returning AuthguardService isAuthenticated: ');
//   // console.log(this.authService.isAuthenticated);
//   console.log('returning this.routeActivated: ' + this.routeActivated);
//   return this.routeActivated;
//   return false;
// }
