import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import * as ShoppingListAcions from './store/shopping-list.actions';
import * as fromAppRecuer from '../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredientChangeSub: Subscription;
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(private store: Store<fromAppRecuer.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredient: Ingredient[]) => {
    //     this.ingredients = ingredient;
    //   }
    // );
  }

  ngOnDestroy(): void {
    // this.ingredientChangeSub.unsubscribe();
  }

  onEditItem(index: number): void {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListAcions.StartEdit(index));
  }
}
