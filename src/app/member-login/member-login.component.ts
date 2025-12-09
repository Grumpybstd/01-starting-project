import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-login',
  standalone: true,
  imports: [FormsModule, LoadingSpinnerComponent],
  templateUrl: './member-login.component.html',
  styleUrl: './member-login.component.css',
})
export class MemberLoginComponent {
  isloginMode = true;
  isLoading = false;
  responseErrorMsg: string = '';
  //This allows to grab the form user input and to auto pre-populate the form
  // if the user reloads the page for whatever reason .g. error in it
  //need to get access to the form outside of the onSubmit
  //need to save the form as the user is entering it to allow to prepopulate

  private form = viewChild<NgForm>('form'); //access the form from the DOM and populate the form variable
  private destroyRef = inject(DestroyRef);

  constructor(private authService: AuthService, private router: Router) {
    //Execute a function after the form has been rendered for the first time
    afterNextRender(() => {
      //step 2 - retrieving the saved login data
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        setTimeout(() => {
          this.form()?.controls['email'].setValue(savedEmail);
        }, 1);
      }

      //step 1 save data entered to local storage
      //valueChanges returns an observable so we need to subscribe to it
      // ? is needed to tell angular it may have value or be undefined or null so subscription should only
      //be set up if valueChanges exists - hence you need to be sure it will exist
      const subscription = this.form()
        ?.valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (value) =>
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({ email: value.email })
            ),
        });
      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    console.log('form submission :');
    console.log(formData);
    if (!formData.valid) {
      return;
    } else {
      const enteredEmail = formData.form.value.email;
      const enteredPassword = formData.form.value.password;
      console.log('form entered data :' + enteredEmail + ' ' + enteredPassword);

      //  (responseData) => {
      //       console.log('Logged in User data : ');
      //       console.log(responseData);
      //       this.isLoading = false;
      //       this.router.navigate(['/users/:userId/memberlogin/member']);
      //     },
      //     (errorMsg) => {
      //       console.log('error data : ');
      //       console.log(errorMsg);
      //       this.responseErrorMsg = errorMsg;
      //       this.isLoading = false;
      //     }

      this.isLoading = true;
      if (this.isloginMode) {
        this.authService.signin(enteredEmail, enteredPassword).subscribe({
          next: (responseData) => {
            console.log('Logged in User data : ');
            console.log(responseData);
            this.isLoading = false;
            this.router.navigate(['/users/:userId/memberlogin/member']);
          },
          error: (errorMsg) => {
            console.log('error data : ');
            console.log(errorMsg);
            this.responseErrorMsg = errorMsg;
            this.isLoading = false;
          },
        });
      } else {
        //N.B. Need to update deprecated subscribe approach below
        this.authService.signup(enteredEmail, enteredPassword).subscribe({
          next: (responseData) => {
            console.log('logged in User data : ');
            console.log(responseData);
            this.isLoading = false;
            this.router.navigate(['/users/:userId/home']);
          },
          error: (errorMsg) => {
            console.log('error data : ');
            console.log(errorMsg);
            this.responseErrorMsg = errorMsg;
            this.isLoading = false;
          },
        });
      }
    }
    formData.reset(); //reset the form once submitted
  }

  onSwitchMode() {
    this.isloginMode = !this.isloginMode;
    console.log('isLoginMode :' + this.isloginMode);
  }
}
