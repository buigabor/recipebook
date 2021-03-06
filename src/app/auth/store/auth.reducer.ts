// ********************************* NGRX New Syntax(V8) *********************************

import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

// tslint:disable-next-line: variable-name
const _authReducer: ActionReducer<State> = createReducer(
  initialState,
  on(AuthActions.loginStart, AuthActions.signupStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),

  on(AuthActions.authenticateSuccess, (state, action) => ({
    ...state,
    authError: null,
    loading: false,
    user: new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    ),
  })),

  on(AuthActions.authenticateFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.errorMessage,
    loading: false,
  })),

  on(AuthActions.logout, (state) => ({ ...state, user: null })),

  on(AuthActions.clearError, (state) => ({
    ...state,
    authError: null,
  }))
);

export function authReducer(state: State, action: Action): State {
  return _authReducer(state, action);
}

// ********************************* NGRX Old Syntax *********************************

// import { User } from './../user.model';
// import * as AuthActions from './auth.actions';

// export interface State {
//   user: User;
//   authError: string;
//   loading: boolean;
// }

// const initialState: State = {
//   user: null,
//   authError: null,
//   loading: false,
// };
// export function authReducer(
//   state = initialState,
//   action: AuthActions.AuthActions
// ) {
//   switch (action.type) {
//     case AuthActions.AUTHENTICATE_SUCCESS:
//       const user = new User(
//         action.payload.email,
//         action.payload.userId,
//         action.payload.token,
//         action.payload.expirationDate
//       );
//       return { ...state, user, authError: null, loading: false };

//     case AuthActions.LOGOUT:
//       return { ...state, user: null };

//     case AuthActions.SIGNUP_START:
//     case AuthActions.LOGIN_START:
//       return {
//         ...state,
//         authError: null,
//         loading: true,
//       };

//     case AuthActions.AUTHENTICATE_FAIL:
//       return {
//         ...state,
//         user: null,
//         authError: action.payload,
//         loading: false,
//       };

//     case AuthActions.CLEAR_ERROR:
//       return { ...state, authError: null };

//     default:
//       return state;
//   }
// }
