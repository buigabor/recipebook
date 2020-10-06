import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Eggs benedict',
  //     'Eggs and benedict and eggs',
  // tslint:disable-next-line: max-line-length
  //     'https://prods3.imgix.net/images/articles/2017_08/Non-Feature-eggs-benedict-recipe-breakfast1.jpg?auto=format%2Ccompress&dpr=2&ixjsv=2.2.3&q=50&w=750',
  //     [new Ingredient('Eggs', 3), new Ingredient('Hollanaise Sauce', 1)]
  //   ),
  //   new Recipe(
  //     'Lamb easter meal tasty yum',
  //     'Lamb with potato and salad',
  //     'https://cdn.pixabay.com/photo/2018/09/27/22/37/lamb-3708116_1280.jpg',
  //     [new Ingredient('Lamb', 2), new Ingredient('Potato', 5)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next([...this.recipes]);
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  toShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.toShoppingList(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes]);
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next([...this.recipes]);
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next([...this.recipes]);
  }
}
