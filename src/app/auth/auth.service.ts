import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { AuthUser } from './authUser.model';
import { getAuth, signOut } from 'firebase/auth';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  loggedInUser!: AuthUser;
  //Subject to allow user object to be emitted and Observable that components can subscribe to get the user Object
  userLoginSubject = new BehaviorSubject<AuthUser | null>(null);
  userLoginObs = new Observable<AuthUser>();
  userLoginObservable = this.userLoginSubject.asObservable();
  //expose as observable so components can only subscribe not emit
  //Possibly use ReplaySubject if want new subscribers to get last emitted value automatically
  //Note:Possibly use BehaviorSubject to hold current user state in conjunction with asObservable to expose to multiple subscribers

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEctru3YsJSTxJmzFTe-KEUK37OXQY8PQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          // if no error we will get back the AuthResponseData which can be used to create new user - note tap operator does not stop block or change the data but just runs code against it
          //gettime returns the number of miliseconds since time started to give current time then add resdata seconds converted to miliseconds to get expire time in the future
          //note + in front of resdata.expiresIn changes string to number
          const expirationDate = new Date( //xpiration date in miliseconds converted to date by new Date()
            new Date().getTime() + +resData.expiresIn * 1000
          );

          const authUser = new AuthUser(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          authUser.userIsAuthenticated = true;
          this.loggedInUser = authUser;
          //this.isAuthenticated = true;
          console.log('Auth Service isUserAuthenticated before emit: ');

          this.userLoginSubject.next(authUser); //now use Subject to emit newly signed in user
        })
      );
  }

  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEctru3YsJSTxJmzFTe-KEUK37OXQY8PQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError), //this will return errormessage to member-login subscription or whichever called signin
        tap((resData) => {
          // if no error we will get back the AuthResponseData which can be used to create new user - note tap operator does not change the data but just runs code against it
          //gettime returns the number of miliseconds since time started to give current time then add resdata seconds converted to miliseconds to get expire time in the future
          //note + in front of resdata.expiresIn changes string to number
          const expirationDate = new Date( //xpiration date in miliseconds converted to date by new Date()
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const authUser = new AuthUser(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          //this.isAuthenticated = true;
          authUser.userIsAuthenticated = true;
          this.loggedInUser = authUser;
          // console.log(
          //   'Auth Service isUserAuthenticated before emit: ' + authUser
          // );
          // console.log(this.loggedInUser.userIsAuthenticated);
          console.log('Auth Service emitting this loggedInUser: ');
          console.log(authUser);
          // console.log(this.loggedInUser.email);
          //return this.loggedInUser;
          this.userLoginSubject.next(authUser);
        })
      );
    //now use Subject to emit newly signed in user
  }

  public get authenticatedUser(): AuthUser {
    return this.loggedInUser;
  }

  private handleError(errorRes: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage)); //throws new observable error with that error message
    }
    //this switch will fail if error does not have the format below as sent by firebase e.g. network failure error
    //there see if statement above checking for one of two formats
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Login credentials were incorrect';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'Password incorrect';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found';
        break;
    }

    // Add logic to extract specific messages from errorRes
    // errorMessage = 'Specific message from backend';

    // Return a new observable that emits an error
    return throwError(() => new Error(errorMessage));
  }

  signout() {
    this.isAuthenticated = false;
    console.log('User signed out from AuthService.');
    //this.userLoginSubject.next(null); //emit null to indicate no user is logged in
  }
  // auth = getAuth();
  // signOut = () => {
  //   signOut(this.auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       console.log('User signed out successfully.');
  //       // You might want to redirect the user to a login page or update UI
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.error('Error signing out:', error);
  //     });
  // };
}
