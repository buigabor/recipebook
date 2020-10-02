import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Eggs benedict',
      'Eggs and benedict and eggs',
      'https://prods3.imgix.net/images/articles/2017_08/Non-Feature-eggs-benedict-recipe-breakfast1.jpg?auto=format%2Ccompress&dpr=2&ixjsv=2.2.3&q=50&w=750',
      [new Ingredient('Eggs', 3), new Ingredient('Hollanaise Sauce', 1)]
    ),
    new Recipe(
      'Lamb easter meal tasty yum',
      'Lamb with potato and salad',
      'https://cdn.pixabay.com/photo/2018/09/27/22/37/lamb-3708116_1280.jpg',
      [new Ingredient('Lamb', 2), new Ingredient('Potato', 5)]
    ),
  ];
  constructor(private shoppingListService: ShoppingListService) {}

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  toShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.toShoppingList(ingredients);
  }
}
