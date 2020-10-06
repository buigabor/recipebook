import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService) {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    let authObs: Observable<AuthResponseData>;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
