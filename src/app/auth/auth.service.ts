import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
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
  //Subject to allow user object to be emitted and Observable that components can subscribe to get the user Object
  private userLoginSubject = new Subject<AuthUser>();
  userLoginObservable = this.userLoginSubject.asObservable();

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
        catchError(this.handleError),
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
          console.log('Auth Service isUserAuthenticated before emit: ');
          console.log(authUser.userIsAuthenticated);
          this.userLoginSubject.next(authUser); //now use Subject to emit newly signed in user
        })
      );
  }

  private handleError(errorRes: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
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
