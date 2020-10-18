import { AuthService } from './auth/auth.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReduce from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ShoppingCart';
  constructor(
    private authService: AuthService,
    private store: Store<fromAppReduce.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(AuthActions.autoLogin());
    }
  }
}
