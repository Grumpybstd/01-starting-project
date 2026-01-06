import { Component, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardServiceComponent implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    console.log('AuthguardServiceComponent constructor called');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.userLoginObservable.subscribe((user) => {
      if (!user) {
        this.authService.isAuthenticated = false;
        console.log(
          'AuthguardServiceComponent - user not logged in, navigating to login'
        );
        this.router.navigate(['/login']);
      } else {
        this.authService.isAuthenticated = true;
      }

      // this.isAuthenticated = !!user ? false : true;
    });
    console.log('Returning AuthguardService canActivate isAuthenticated: ');
    console.log(this.authService.isAuthenticated);
    return this.authService.isAuthenticated;
    // return false;
  }
}
