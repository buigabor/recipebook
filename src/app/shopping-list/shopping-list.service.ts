import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() {}

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next([...this.ingredients]);
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  toShoppingList(ingredients: Ingredient[]): void {
    // for (const ingredientEl of ingredient) {
    //   this.ingredients.push(ingredientEl);
    // }

    this.ingredients.push(...ingredients);
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    // this.ingredients.splice(index, 1, newIngredient);
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next([...this.ingredients]);
  }
}
