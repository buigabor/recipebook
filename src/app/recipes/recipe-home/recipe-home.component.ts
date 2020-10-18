import { map, switchMap, take, filter } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

import { Component } from '@angular/core';
import * as RecipeActions from '../store/recipe.actions';
import * as fromAppReducer from '../../store/app.reducer';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-home',
  templateUrl: './recipe-home.component.html',
  styleUrls: ['./recipe-home.component.css'],
})
export class RecipeHomeComponent {
  notFetched: boolean;
  constructor(
    private actions$: Actions,
    private store: Store<fromAppReducer.AppState>
  ) {
    this.actions$
      .pipe(
        ofType(RecipeActions.setRecipes),
        map((recipesState) => {
          return recipesState.recipes;
        })
      )
      .subscribe((recipes) => {
        if (recipes.length === 0) {
          this.notFetched = true;
        }
      });
  }
}
