import { RecipeService } from './../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://ng-recipe-book-2a63a.firebaseio.com/recipes.json', recipes)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchRecipes() {
    return (
      this.http
        .get<Recipe[]>(
          'https://ng-recipe-book-2a63a.firebaseio.com/recipes.json'
        )
        //we need to insert ingredients here, even if we dont have them in the recipe
        //to avoid bugs
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
        )
    );
  }
}
