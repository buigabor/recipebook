import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import * as AuthActions from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return AuthActions.authenticateSuccess({
    email,
    userId,
    token,
    expirationDate,
    redirect: true,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFail({ errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(AuthActions.authenticateFail({ errorMessage }));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap((action) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
              environment.firebaseAPIKey,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((action) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
              environment.firebaseAPIKey,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const user = localStorage.getItem('userData');
        if (!user) {
          // Return Dummy action
          return { type: 'DUMMY' };
        }
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(user);

        if (userData._token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);

          return AuthActions.authenticateSuccess({
            email: userData.email,
            userId: userData.id,
            token: userData._token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false,
          });
        }

        // Return Dummy action
        return { type: 'DUMMY' };
      })
    )
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Actions, ofType, Effect } from '@ngrx/effects';
// import { switchMap, catchError, map, tap, filter } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import * as config from '../config.json';

// import * as AuthActions from './auth.actions';
// import { User } from '../user.model';
// import { AuthService } from '../auth.service';

// const handleAuthentication = (
//   expiresIn: number,
//   email: string,
//   userId: string,
//   token: string
// ) => {
//   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
//   const user = new User(email, userId, token, expirationDate);
//   localStorage.setItem('userData', JSON.stringify(user));
//   return new AuthActions.AuthenticateSuccess({
//     email,
//     userId,
//     token,
//     expirationDate,
//     redirect: true,
//   });
// };

// const handleError = (errorRes: any) => {
//   let errorMessage = 'An unknown error occurred!';
//   if (!errorRes.error || !errorRes.error.error) {
// return of(new AuthActions.AuthenticateFail(errorMessage));
//   }
//   switch (errorRes.error.error.message) {
//     case 'EMAIL_EXISTS':
//       errorMessage = 'This email exists already';
//       break;
//     case 'EMAIL_NOT_FOUND':
//       errorMessage = 'This email does not exist.';
//       break;
//     case 'INVALID_PASSWORD':
//       errorMessage = 'This password is not correct.';
//       break;
//   }
//   return of(new AuthActions.AuthenticateFail(errorMessage));
// };

// export interface AuthResponseData {
//   kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

// @Injectable()
// export class AuthEffects {
//   @Effect()
//   authSignup = this.actions$.pipe(
//     ofType(AuthActions.SIGNUP_START),
//     switchMap((signupAction: AuthActions.SignupStart) => {
//       return this.http
//         .post<AuthResponseData>(
//           'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
//             enviroment.firebaseAPIKey,
//           {
//             email: signupAction.payload.email,
//             password: signupAction.payload.password,
//             returnSecureToken: true,
//           }
//         )
//         .pipe(
//           tap((resData) => {
//             this.authService.setLogoutTimer(+resData.expiresIn * 1000);
//           }),
//           map((resData) => {
//             return handleAuthentication(
//               +resData.expiresIn,
//               resData.email,
//               resData.localId,
//               resData.idToken
//             );
//           }),
//           catchError((errorRes) => {
//             return handleError(errorRes);
//           })
//         );
//     })
//   );

//   @Effect()
//   authLogin = this.actions$.pipe(
//     ofType(AuthActions.LOGIN_START),
//     switchMap((authData: AuthActions.LoginStart) => {
//       return this.http
//         .post<AuthResponseData>(
//           'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
//             enviroment.firebaseAPIKey,
//           {
//             email: authData.payload.email,
//             password: authData.payload.password,
//             returnSecureToken: true,
//           }
//         )
//         .pipe(
//           tap((resData) => {
//             this.authService.setLogoutTimer(+resData.expiresIn * 1000);
//           }),
//           map((resData) => {
//             return handleAuthentication(
//               +resData.expiresIn,
//               resData.email,
//               resData.localId,
//               resData.idToken
//             );
//           }),
//           catchError((errorRes) => {
//             return handleError(errorRes);
//           })
//         );
//     })
//   );

//   @Effect({ dispatch: false })
//   authRedirect = this.actions$.pipe(
//     ofType(AuthActions.AUTHENTICATE_SUCCESS),
//     tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
//       if (authSuccessAction.payload.redirect) {
//         this.router.navigate(['/']);
//       }
//     })
//   );

//   @Effect()
//   autoLogin = this.actions$.pipe(
//     ofType(AuthActions.AUTO_LOGIN),
//     map(() => {
//       const userData: {
//         email: string;
//         id: string;
//         _token: string;
//         _tokenExpirationDate: string;
//       } = JSON.parse(localStorage.getItem('userData'));
//       if (userData) {
//         const loadedUser = new User(
//           userData.email,
//           userData.id,
//           userData._token,
//           new Date(userData._tokenExpirationDate)
//         );
//         if (loadedUser.token) {
//           // this.user.next(loadedUser);
//           const expirationDuration =
//             new Date(userData._tokenExpirationDate).getTime() -
//             new Date().getTime();
//           this.authService.setLogoutTimer(expirationDuration);
//           return new AuthActions.AuthenticateSuccess({
//             email: loadedUser.email,
//             userId: loadedUser.id,
//             token: loadedUser.token,
//             expirationDate: new Date(userData._tokenExpirationDate),
//             redirect: false,
//           });
//         }
//       }
//     }),
//     filter(Boolean)
//   );

//   @Effect({ dispatch: false })
//   authLogout = this.actions$.pipe(
//     ofType(AuthActions.LOGOUT),
//     tap(() => {
//       this.authService.clearLogoutTimer();
//       localStorage.removeItem('userData');
//       this.router.navigate(['/auth']);
//     })
//   );

//   constructor(
//     private actions$: Actions,
//     private http: HttpClient,
//     private router: Router,
//     private authService: AuthService
//   ) {}
// }
