import { Recipe } from './../recipes/recipe.model';
import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://ng-recipe-book-2a63a.firebaseio.com/recipes.json', recipes)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>('https://ng-recipe-book-2a63a.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );

    // we need to insert ingredients here, even if we dont have them in the recipe
    // to avoid bugs
  }
}
