// ********************************* NGRX New Syntax(V8) *********************************

import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import * as RecipeActions from './recipe.actions';
import * as fromAppReducer from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://ng-recipe-book-2a63a.firebaseio.com/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes
          ? recipes.map((recipe: Recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            })
          : [];
      }),
      map((recipes) => {
        return RecipeActions.setRecipes({ recipes });
      })
    )
  );
  storeRecipes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.storeRecipes),
        withLatestFrom(this.store.select('recipes')),
        switchMap((actionAndRecipeState) => {
          const recipe = actionAndRecipeState[1].recipes;
          return this.http.put(
            'https://ng-recipe-book-2a63a.firebaseio.com/recipes.json',
            recipe
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromAppReducer.AppState>
  ) {}
}

// ********************************* NGRX Old Syntax *********************************

// import { Store } from '@ngrx/store';
// import { HttpClient } from '@angular/common/http';
// import { map, switchMap, withLatestFrom } from 'rxjs/operators';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Recipe } from '../recipe.model';
// import { Injectable } from '@angular/core';
// import * as RecipeActions from './recipe.actions';
// import * as fromAppReducer from '../../store/app.reducer';

// @Injectable()
// export class RecipeEffects {
//   @Effect()
//   fetchRecipes = this.actions$.pipe(
//     ofType(RecipeActions.FETCH_RECIPES),
//     switchMap(() => {
//       return this.http.get<Recipe[]>(
//         'https://ng-recipe-book-2a63a.firebaseio.com/recipes.json'
//       );
//     }),
//     map((recipes) => {
//       return recipes
//         ? recipes.map((recipe: Recipe) => {
//             return {
//               ...recipe,
//               ingredients: recipe.ingredients ? recipe.ingredients : [],
//             };
//           })
//         : [];
//     }),
//     map((recipes) => {
//       return new RecipeActions.SetRecipes(recipes);
//     })
//   );

//   @Effect({ dispatch: false })
//   storeRecipe = this.actions$.pipe(
//     ofType(RecipeActions.STORE_RECIPE),
//     withLatestFrom(this.store.select('recipes')),
//     switchMap((actionAndRecipeState) => {
//       const recipe = actionAndRecipeState[1].recipes;
//       return this.http.put(
//         'https://ng-recipe-book-2a63a.firebaseio.com/recipes.json',
//         recipe
//       );
//     })
//   );

//   constructor(
//     private actions$: Actions,
//     private http: HttpClient,
//     private store: Store<fromAppReducer.AppState>
//   ) {}
// }
