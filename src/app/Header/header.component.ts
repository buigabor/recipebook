import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromAppReducer from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  collapsed = true;
  userSub: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromAppReducer.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = user ? true : false;
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData(): void {
    this.store.dispatch(RecipesActions.storeRecipes());
  }

  onFetchData(): void {
    this.store.dispatch(RecipesActions.fetchRecipes());
    this.router.navigate(['/recipes']);
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
